import { Graphics, Container, Application } from "pixi.js";
import { DIRECTION } from "./constants";

function Triangle(r: number) {
  const graphics = new Graphics();

  graphics.beginFill(0x0984ff);
  [
    //
    0,
    (1 / 3) * (2 * Math.PI),
    (2 / 3) * (2 * Math.PI),
    0
  ].forEach(angle => {
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    graphics.lineTo(x, y);
  });
  graphics.endFill();

  return graphics;
}

function Button() {
  const button = new Container();
  button.addChild(Triangle(25));

  button.interactive = true;
  button.buttonMode = true;

  return button;
}

function useHold([leftBtn, rightBtn]: Container[]) {
  let hold = DIRECTION.NONE;

  leftBtn.on("pointerdown", () => (hold = DIRECTION.LEFT));
  rightBtn.on("pointerdown", () => (hold = DIRECTION.RIGHT));
  leftBtn.on("pointerup", () => (hold = DIRECTION.NONE));
  rightBtn.on("pointerup", () => (hold = DIRECTION.NONE));

  return () => hold;
}

export default function UI(app: Application) {
  const ui = new Container();

  const leftBtn = Button();
  leftBtn.rotation = Math.PI;

  const rightBtn = Button();

  ui.addChild(leftBtn, rightBtn);

  const { width, height } = app.screen;
  leftBtn.position.set(width * (1 / 10), height / 2);
  rightBtn.position.set(width * (9 / 10), height / 2);

  const hold = useHold([leftBtn, rightBtn]);

  app.ticker.add(delta => {
    if (!hold()) {
      return;
    }

    ui.emit("click", hold());
  });

  return ui;
}
