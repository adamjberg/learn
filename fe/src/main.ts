type Component = () => HTMLElement;

type RouterProps = {
  routes: {
    path: string;
    exact?: boolean;
    component: Component;
  }[];
};

type Update = {
  location: string;
};

type Listener = (update: Update) => void;
class BrowserHistory {
  private listeners: Listener[] = [];

  constructor() {
    window.addEventListener("popstate", (event) => {
      this.listeners.forEach((listener) => {
        listener({
          location: document.location.pathname,
        });
      });
    });
  }

  public push(to: string) {
    history.pushState({}, "", to);
    const update: Update = {
      location: to,
    };
    this.listeners.forEach((listener) => {
      listener(update);
    });
  }

  public listen(listener: Listener) {
    this.listeners.push(listener);
  }
}

class Api {
  constructor(public baseUrl: string) {}

  public async getAll() {
    const res = await fetch(`${this.baseUrl}`);
    const jsonData = await res.json();
    return jsonData.data;
  }

  public async get(id: string) {
    const res = await fetch(`${this.baseUrl}/${id}`);
    const jsonData = await res.json();
    return jsonData.data;
  }
}
class PostApi extends Api {
  constructor() {
    super("/api/posts");
  }
}

const postApi = new PostApi();

const browserHistory = new BrowserHistory();

function removeAllChildNodes(parent: HTMLElement) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function Div() {
  return document.createElement("div");
}

function Link(props: { to: string; children: HTMLElement }) {
  const el = document.createElement("a");

  el.addEventListener("click", function (event) {
    event.preventDefault();
    browserHistory.push(props.to);
  });

  el.setAttribute("href", props.to);

  el.appendChild(props.children);

  return el;
}

function Router(props: RouterProps) {
  const el = document.createElement("div");

  browserHistory.listen((update) => {
    render();
  });

  function render() {
    const path = document.location.pathname;
    removeAllChildNodes(el);

    const container = Container();
    el.appendChild(container);

    const homeLink = document.createElement("div");
    homeLink.innerText = "Home";
    container.appendChild(Link({ to: "/", children: homeLink }));

    for (const route of props.routes) {
      let isActiveRoute = route.exact ? route.path === path : path.includes(route.path);
      if (isActiveRoute) {
        el.appendChild(route.component());
      }
    }
  }

  render();

  return el;
}

function Container() {
  const el = document.createElement("div");
  el.setAttribute("class", "container");
  return el;
}

function Row() {
  const el = document.createElement("div");
  el.setAttribute("class", "row");
  return el;
}

function Card(props: { href: string; img: string; title: string }) {
  const el = document.createElement("div");
  el.setAttribute("class", "card");

  const img = document.createElement("img");
  img.setAttribute("src", props.img);
  el.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  el.append(cardBody)

  const title = document.createElement("div");
  title.setAttribute("class", "card-title");
  title.innerText = props.title;
  cardBody.appendChild(title);

  return Link({ to: props.href, children: el });
}

function HomePage() {
  const el = document.createElement("div");

  async function render() {
    const posts = await postApi.getAll();

    const container = Container();

    const cardProps = posts.map((post: any) => {
      return {
        href: `/posts/${post.slug}`,
        img: `/static/img/${post.cover}`,
        title: post.title
      }
    });

    cardProps.forEach((cardProp: any) => {
      const cardWrapper = Div();
      cardWrapper.setAttribute("class", "mb-3");

      const card = Card(cardProp);
      cardWrapper.appendChild(card);
      
      container.appendChild(cardWrapper);
    });

    el.appendChild(container);
  }

  render();

  return el;
}

function ViewPostPage() {
  const el = document.createElement("div");
  const pathname = document.location.pathname;
  const splitPathname = pathname.split("/");
  const id = splitPathname[splitPathname.length - 1];

  async function render() {
    const post = await postApi.get(id);

    const container = Container();
    const h1 = document.createElement("h1");
    h1.innerText = post.title;

    const body = document.createElement("div");
    body.innerHTML = marked(post.body);

    container.appendChild(h1);
    container.appendChild(body);

    el.appendChild(container);

    Prism.highlightAll();
  }

  render();

  return el;
}

function App() {
  const el = document.createElement("div");

  el.appendChild(
    Router({
      routes: [
        {
          path: "/",
          exact: true,
          component: HomePage,
        },
        {
          path: "/posts",
          component: ViewPostPage,
        }
      ],
    })
  );

  return el;
}

class XDom {
  static render(App: () => HTMLElement, root: HTMLElement | null) {
    if (root) {
      root.appendChild(App());
    }
  }
}

XDom.render(App, document.getElementById("root"));
