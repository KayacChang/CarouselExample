import { Application } from "pixi.js";
import UI from "./UI";
import assets from "./assets";
import { DIRECTION, ASSETS } from "./constants";
import Carousel from "./Carousel";

function RandomGenerator(items: string[]) {
  return () => {
    const item = items[(items.length * Math.random()) | 0];

    return assets.get(item);
  };
}

async function main(app: Application) {
  await assets.load(ASSETS);

  const carousel = Carousel(RandomGenerator(Object.keys(ASSETS)));
  carousel.position.set(app.screen.width / 2, app.screen.height / 2);
  carousel.pivot.set(carousel.width / 2, carousel.height / 2);

  const ui = UI(app);
  ui.on("click", (dir: DIRECTION) => carousel.emit("update", dir));

  app.stage.addChild(carousel, ui);
}

export default main;
