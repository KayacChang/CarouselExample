import { Container, Sprite, Texture, Graphics } from "pixi.js";
import { DIRECTION } from "./constants";

const SPEED = 5;
const SLOT_COUNT = 5;
const DISPLAY_COUNT = 3;

function ViewPort(width: number, height: number) {
  const mask = new Graphics();

  mask.beginFill(0xffffff);
  mask.drawRect(0, 0, width, height);
  mask.endFill();

  return mask;
}

export default function Carousel(getItem: () => Texture) {
  const carousel = new Container();

  const items = Array.from({ length: SLOT_COUNT }, () => new Sprite(getItem()));
  carousel.addChild(...items);

  carousel.once("added", init);
  carousel.on("update", update);

  return carousel;

  function init() {
    const { width, height } = items[0];

    items.reduce((posX, element) => {
      element.x = posX;

      return posX + element.width;
    }, -width * Math.floor(SLOT_COUNT / 2));

    const viewport = ViewPort(width * DISPLAY_COUNT, height);
    viewport.x += -width * Math.floor(DISPLAY_COUNT / 2);
    carousel.mask = viewport;
    carousel.addChild(viewport);
  }

  function update(dir: DIRECTION) {
    const width = carousel.width;
    const limitX = width / 2;
    const vecX = SPEED;

    items.forEach(item => {
      item.x += vecX * dir;

      if (Math.abs(item.x) > limitX) {
        item.texture = getItem();
        item.x -= width * dir;
      }
    });
  }
}
