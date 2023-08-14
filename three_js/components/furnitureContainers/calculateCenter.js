import { Box3, Vector3 } from "three";

let boundingBox = new Box3();
let centerOfModel = new Vector3();
function calculateCenter(model) {
  boundingBox.setFromObject(model);

  boundingBox.getCenter(centerOfModel);
  // console.log(centerOfModel);
  return centerOfModel;
}

export { calculateCenter };
