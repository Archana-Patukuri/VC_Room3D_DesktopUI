import { LoadingManager } from "three";
const manager = new LoadingManager();
manager.onError = function (url) {
  console.log("There was an error loading " + url);
};
export { manager };
