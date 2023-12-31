
const setSize = function (container, camera, renderer, composer) {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  let val = 1;

  //If Android/iPhone, Reduce the Pixel ratio for the performance
  if (/Android|iPhone/i.test(navigator.userAgent)) {
    val = 0.5;    
  } 

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio * val);

  composer.setSize(container.clientWidth, container.clientHeight);
  composer.setPixelRatio(window.devicePixelRatio * val);
 
};

class Resizer {
  constructor(container, camera, renderer, composer,labelRenderer,postprocessing) {    
    setSize(container, camera, renderer, composer);
    window.addEventListener("resize", () => {      
      setSize(container, camera, renderer, composer);      
    });
  }
}

export { Resizer };
