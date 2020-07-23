import { Container, Sprite, Texture, Graphics } from "pixi.js";
import { DIRECTION } from "./constants";

const SPEED = 5;
const SLOT_COUNT = 5;
const DISPLAY_COUNT = 3;

export default function Carousel(getItem: () => Texture) {
  const carousel = new Container();

  const items = Array(SLOT_COUNT)
    .fill(undefined)
    .map(() => new Sprite(getItem()));

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

    const mask = new Graphics();
    mask.beginFill(0xffffff);
    mask.drawRect(0, 0, width * DISPLAY_COUNT, height);
    mask.endFill();
    mask.x += -width * Math.floor(DISPLAY_COUNT / 2);

    carousel.mask = mask;
    carousel.addChild(mask);
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
