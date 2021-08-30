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

function Card(props: { img: string; title: string }) {
  const el = document.createElement("div");
  el.setAttribute("class", "card");

  const img = document.createElement("img");
  img.setAttribute("src", props.img);
  el.appendChild(img);

  const title = document.createElement("div");
  title.innerText = props.title;
  el.appendChild(title);

  return el;
}

function App() {
  const el = document.createElement("div");

  const container = Container();

  const cardProps = [
    {
      img: "/static/AdamsWorld-0.0.1.png",
      title: "Create a React App with Create-React-App",
    },
    {
      img: "/static/AdamsWorld-0.0.1.png",
      title: "Build a Personal Finance App",
    }
  ];

  cardProps.forEach((cardProp) => {
    container.appendChild(
      Card(cardProp)
    );
  })

  el.appendChild(container);

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
