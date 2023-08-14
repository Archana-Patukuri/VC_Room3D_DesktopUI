import {MOUSE} from "three";
import useSpinner from '../../use-spinner';
import '../../use-spinner/assets/use-spinner.css';
let container_3d=document.getElementById("3dcontainer");

function basicControls(scene,camera,controls,renderer) {  

  controls.enableZoom = true;
  controls.enablePan=true;
  controls.enableRotate=true;
  controls.minPolarAngle=controls.maxPolarAngle=1.57079
  controls.listenToKeyEvents( window );  

  document.addEventListener("keydown", onDocumentKeyDown, false);
  async function onDocumentKeyDown(event) {
  var keyCode = event.which;
  if (keyCode == 32) {
    //keyCode 32 is for spacebar
    scene.rotation.y -= 0.01;
  }
  if (keyCode == 189) {
    //keyCode 32 is for spacebar
    camera.position.z += 1;
  }
  if (keyCode == 187) {
    //keyCode 32 is for spacebar
    camera.position.z -= 1;
  }
}
  controls.mouseButtons = {
    LEFT: MOUSE.ROTATE,
    MIDDLE: MOUSE.DOLLY,
    RIGHT: MOUSE.PAN
  } 
    let navigationOpt=document.querySelectorAll(".navigationOpt");
   
    const Zoom_fn = async () => {
      await new Promise(resolve => setTimeout(() => {
        console.log("zoom clicked")
        controls.enableZoom = true;    
        navigationOpt[0].style.background="#FF5A50";
        navigationOpt[0].style.color="#FFFFFF"; 
        resolve();
      }, 10));
    }; 
     async function Zoom_Fun() {                                      
      const spinnedFn = useSpinner(Zoom_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();
   }      
    const Zoom_Else_fn = async () => {
      await new Promise(resolve => setTimeout(() => {
        controls.enableZoom = false;  
        navigationOpt[0].style.background="#FFFFFF";
        navigationOpt[0].style.color="#000000"; 
        resolve();
      }, 10));
    }; 
     async function Zoom_Else_Fun() {                                      
      const spinnedFn = useSpinner(Zoom_Else_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();
   }        
    let Zoom=document.getElementById("Zoom");
        Zoom.addEventListener("change", (e) => {
          if (e.target.checked) {
            Zoom_Fun()                         
          }else{
            Zoom_Else_Fun()
          }
        }) ;
        const Rotate_fn = async () => {
          await new Promise(resolve => setTimeout(() => {
            console.log("rotate clicked")
            controls.enableRotate=true;  
            navigationOpt[2].style.background="#FF5A50";
            navigationOpt[2].style.color="#FFFFFF"; 
            resolve();
          }, 10));
        }; 
         async function Rotate_Fun() {                                      
          const spinnedFn = useSpinner(Rotate_fn, {
           container: container_3d
         });      
         // execute with a loading spinner
         await spinnedFn();
       }        
        const Rotate_Else_fn = async () => {
          await new Promise(resolve => setTimeout(() => {
            controls.enableRotate=false; 
            navigationOpt[2].style.background="#FFFFFF";
            navigationOpt[2].style.color="#000000";  
            resolve();
          }, 10));
        }; 
         async function Rotate_Else_Fun() {                                      
          const spinnedFn = useSpinner(Rotate_Else_fn, {
           container: container_3d
         });      
         // execute with a loading spinner
         await spinnedFn();
       }        
    let Rotate=document.getElementById("Rotate1");    
        Rotate.addEventListener("change", (e) => {
          if (e.target.checked) {
            Rotate_Fun()     
          }else{
            Rotate_Else_Fun()
          }
        })
        const Pan_fn = async () => {
          await new Promise(resolve => setTimeout(() => {
            console.log("PAN clicked")
            controls.enablePan=true;   
            navigationOpt[1].style.background="#FF5A50";
            navigationOpt[1].style.color="#FFFFFF";  
            resolve();
          }, 10));
        }; 
         async function Pan_Fun() {                                      
          const spinnedFn = useSpinner(Pan_fn, {
           container: container_3d
         });      
         // execute with a loading spinner
         await spinnedFn();
       }    
          
        const Pan_Else_fn = async () => {
          await new Promise(resolve => setTimeout(() => {
            controls.enablePan=false; 
            navigationOpt[1].style.background="#FFFFFF";
            navigationOpt[1].style.color="#000000";        
            resolve();
          }, 10));
        }; 
         async function Pan_Else_Fun() {                                      
          const spinnedFn = useSpinner(Pan_Else_fn, {
           container: container_3d
         });      
         // execute with a loading spinner
         await spinnedFn();
       }                 
    let Pan=document.getElementById("Pan");
        Pan.addEventListener("change", (e) => {
          if (e.target.checked) { 
            Pan_Fun()
          }else{
            Pan_Else_Fun()
          }
        })     
     
        
        let zoom_home=document.getElementById("zoom_home");
        let pan_home=document.getElementById("pan_home");
        let rotate_home=document.getElementById("rotate_home");
        zoom_home.addEventListener("click", function(){
          Zoom_fn()                    
        }) 
        pan_home.addEventListener("click", function(){
          Pan_Fun()                      
      }) 
      rotate_home.addEventListener("click", function(){
        Rotate_fn()                     
    })  
  controls.maxDistance=10;  
  controls.update();
  
}

export { basicControls };
