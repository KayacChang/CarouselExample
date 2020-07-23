import { Loader } from "pixi.js";

const loader = new Loader();

function load(pkg: Record<string, string>) {
  const assets = Object.entries(pkg).map(([name, url]) => ({ name, url }));

  loader.add(assets);

  return new Promise(res => loader.load(res));
}

function get(name: string) {
  return loader.resources[name].texture;
}

export default {
  load,
  get
};
