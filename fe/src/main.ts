import * as marked from "marked";

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

function Div(props?: { text?: string }) {
  const el = document.createElement("div");

  if (props?.text) {
    el.innerText = props.text;
  }

  return el;
}

function Link(props: {
  to: string;
  children?: HTMLElement;
  text?: string;
  class?: string;
  newTab?: boolean;
}) {
  const el = document.createElement("a");

  if (!props.newTab) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      browserHistory.push(props.to);
    });
  }

  el.setAttribute("href", props.to);

  if (props.newTab) {
    el.setAttribute("target", "_blank");
  }

  if (props.text) {
    el.innerText = props.text;
  }

  if (props.class) {
    el.setAttribute("class", props.class);
  }

  if (props.children) {
    el.appendChild(props.children);
  }

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

    const header = document.createElement("header");
    el.appendChild(header);

    const container = Container();
    header.appendChild(container);

    container.appendChild(Link({ to: "/", text: "Home" }));

    const aboutLink = Link({ to: "/about", text: "About", class: "ml-2" });
    container.appendChild(aboutLink);

    const signUpLink = Link({ to: "https://mailchi.mp/89973d519497/learn-xyz-mailing-list", text: "Join Mailing List", class: "ml-2", newTab: true });
    container.appendChild(signUpLink);

    for (const route of props.routes) {
      let isActiveRoute = route.exact
        ? route.path === path
        : path.includes(route.path);
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

function Card(props: { href: string; img: string; title: string; subTitle: string }) {
  const el = document.createElement("div");
  el.setAttribute("class", "card");

  const img = document.createElement("img");
  img.setAttribute("src", props.img);
  el.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  el.append(cardBody);

  const title = document.createElement("div");
  title.setAttribute("class", "card-title");
  title.innerText = props.title;
  cardBody.appendChild(title);

  if (props.subTitle) {
    const subTitle = document.createElement("div");
    subTitle.setAttribute("class", "text-muted");
    subTitle.innerText = props.subTitle;
    cardBody.appendChild(subTitle);
  }

  const link = Link({ to: props.href, children: el });
  link.className = "no-underline text-black";
  return link;
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
        title: post.title,
        subTitle: post.type === "project" ? "Project" : "Post"
      };
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
    body.innerHTML = marked.parse(post.body);

    container.appendChild(h1);
    container.appendChild(body);

    if (post.type === "project") {
      container.appendChild(ProjectSubmit())
    }

    el.appendChild(container);

    Prism.highlightAll();
  }

  render();

  return el;
}

function ProjectSubmit() {
  const el = document.createElement("div");

  const h2 = document.createElement("h2");
  h2.innerText = "Submit Project";
  el.appendChild(h2);

  const resultText = Div();
  el.appendChild(resultText);

  const input = document.createElement("input");
  input.placeholder = "http://helloworld.devtails.xyz";
  el.appendChild(input);

  const button = document.createElement("button");
  button.addEventListener("click", async function() {
    const res = await fetch("/api/project/1/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: input.value })
    });
    const jsonData = await res.json();
    if (jsonData.success) {
      resultText.className = "text-success";
      resultText.innerText = "Success!"
    } else {
      resultText.className = "text-danger";
      resultText.innerText = "Incorrect"
    }
  })
  button.innerText = "Submit";
  el.appendChild(button);

  return el;
}

function AboutPage() {
  const el = Container();

  el.innerHTML = marked.parse(`
  ## Hello, my name is Adam

  and after 11 years of programming, I'm still disappointed in the state of programming tutorials across the web and the pace that new developers are able to level up.  

  ## Project Based Learning

  I strongly believe that project based learning is the way to go and so the learning on this site will be centered around that.  Each project will conclude with something deployed to your own domain on your own server. Each project will build upon the knowledge learned from the previous one. 

  ## Technology Paralysis

  "Should I use X or Y?" is one of the largest barriers to getting started.  Instead of covering all possible ways of solving a problem, I instead intend to stick to whatever I know best. Once you have made it far enough along, it should be easy enough to transfer the knowledge to whatever other service or technology you hope to use.  

  ## Help Me Help You

  This site is in its infancy as I determine whether I can help or if I'm just adding more 💩to the pile. If you have any feedback please email me at [adam@xyzdigital.com](adam@xyzdigital.com).
`);
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
          path: "/about",
          component: AboutPage,
        },
        {
          path: "/posts",
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

(function() {
  XDom.render(App, document.getElementById("root"));
})()
