import * as React from "react";
import { render } from "react-dom";
import "./styles.css";

import { Application } from "pixi.js";
import main from "./App";

function init(canvas: HTMLCanvasElement) {
  if (!canvas) {
    return;
  }

  const app = new Application({ view: canvas });

  main(app);
}

function App() {
  return (
    <div className="App">
      <h1>Carousel Example</h1>
      <canvas ref={init} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
