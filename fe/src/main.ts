type Component = () => HTMLElement;

type RouterProps = {
  routes: {
    path: string;
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

function Router(props: RouterProps) {
  const el = document.createElement("div");

  browserHistory.listen((update) => {
    render();
  });

  function render() {
    const path = document.location.pathname;
    removeAllChildNodes(el);
    for (const route of props.routes) {
      if (route.path === path) {
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

  el.addEventListener("click", (event) => {
    event.preventDefault();
    browserHistory.push(props.href);
  });

  const img = document.createElement("img");
  img.setAttribute("src", props.img);
  el.appendChild(img);

  const title = document.createElement("div");
  title.innerText = props.title;
  el.appendChild(title);

  return el;
}

function HomePage() {
  const el = document.createElement("div");

  const container = Container();

  const cardProps = [
    {
      href: "/posts/1",
      img: "/static/AdamsWorld-0.0.1.png",
      title: "Create a React App with Create-React-App",
    },
  ];

  cardProps.forEach((cardProp) => {
    container.appendChild(Card(cardProp));
  });

  el.appendChild(container);

  return el;
}

function ViewPostPage() {
  const el = document.createElement("div");

  async function render() {
    const post = await postApi.get("1");

    const container = Container();
    const h1 = document.createElement("h1");
    h1.innerText = post.title;

    const body = document.createElement("div");
    body.innerText = post.body;

    container.appendChild(h1);
    container.appendChild(body);

    el.appendChild(container);
  }

  render()

  return el;
}

function App() {
  const el = document.createElement("div");

  el.appendChild(
    Router({
      routes: [
        {
          path: "/",
          component: HomePage,
        },
        {
          path: "/posts/1",
          component: ViewPostPage,
        },
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
