import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import useSpinner from '../../use-spinner';
import '../../use-spinner/assets/use-spinner.css';
let container_3d=document.getElementById("3dcontainer");

function viewPoints(camera) {
    const view1_fn = async () => {
      await new Promise(resolve => setTimeout(() => {
        var tween = new TWEEN.Tween(camera.position).to({
          x: 0.01,
          y: 2.165,
          z: 4.73}, 1500);          
        tween.easing(TWEEN.Easing.Sinusoidal.InOut);
        tween.start();    
        resolve();
      }, 10));
    }; 
    async function view1_Fun() {                                      
      const spinnedFn = useSpinner(view1_fn, {
      container: container_3d
    });      
    // execute with a loading spinner
    await spinnedFn();
    }     
      let view1=document.getElementById("Camera_Main_View");      
          view1.addEventListener("change", (e) => {
            if (e.target.checked) {                                            
              view1_Fun();
          }
          })
          const view2_fn = async () => {
            await new Promise(resolve => setTimeout(() => {
              var tween = new TWEEN.Tween(camera.position).to({
                x: 0.479,
                y: 1.065,
                z: 6.433}, 1500);
              tween.easing(TWEEN.Easing.Sinusoidal.InOut);
              tween.start();   
              resolve();
            }, 10));
          }; 
           async function view2_Fun() {                                      
            const spinnedFn = useSpinner(view2_fn, {
             container: container_3d
           });      
           // execute with a loading spinner
           await spinnedFn();
         }         
        let view2=document.getElementById("Camera_Focus_On_Cealing_Lights");   
          view2.addEventListener("change", (e) => {
            if (e.target.checked) {    
              view2_Fun()                                                             
            }
          })   
          const view3_fn = async () => {
            await new Promise(resolve => setTimeout(() => {
              var tween = new TWEEN.Tween(camera.position).to({
                x: 0,
                y: 2.165,
                z: -4.5}, 1500);
              tween.easing(TWEEN.Easing.Sinusoidal.InOut);
              tween.start();  
              resolve();
            }, 10));
          }; 
           async function view3_Fun() {                                      
            const spinnedFn = useSpinner(view3_fn, {
             container: container_3d
           });      
           // execute with a loading spinner
           await spinnedFn();
         }           
      let view3=document.getElementById("Camera_Back_View");   
        view3.addEventListener("change", (e) => {
          if (e.target.checked) {    
            view3_Fun()                                                      
        }
        })    
        const view4_fn = async () => {
          await new Promise(resolve => setTimeout(() => {
            var tween = new TWEEN.Tween(camera.position).to({
              x: 0.479,
              y: 2.165,
              z: 3.033}, 1500);
            tween.easing(TWEEN.Easing.Sinusoidal.InOut);
            tween.start();  
            resolve();
          }, 10));
        }; 
         async function view4_Fun() {                                      
          const spinnedFn = useSpinner(view4_fn, {
           container: container_3d
         });      
         // execute with a loading spinner
         await spinnedFn();
       }       
      let view4=document.getElementById("Camera_Near_Table");    
        view4.addEventListener("change", (e) => {
          if (e.target.checked) {   
            view4_Fun()                             
        }
        })
        const view5_fn = async () => {
          await new Promise(resolve => setTimeout(() => {
            var tween = new TWEEN.Tween(camera.position).to({
              x: 2.479,
              y: 2.165,
              z: 2.433}, 1500);
            tween.easing(TWEEN.Easing.Sinusoidal.InOut);
            tween.start();    
            resolve();
          }, 10));
        }; 
         async function view5_Fun() {                                      
          const spinnedFn = useSpinner(view5_fn, {
           container: container_3d
         });      
         // execute with a loading spinner
         await spinnedFn();
       }       
      let view5=document.getElementById("Camera_Near_Blinds");    
        view5.addEventListener("change", (e) => {
          if (e.target.checked) {     
            view5_Fun()               
        }
        })
        const view6_fn = async () => {
          await new Promise(resolve => setTimeout(() => {
            var tween = new TWEEN.Tween(camera.position).to({
              x: 3.479,
              y: 0.165,
              z: 0}, 1500);
            tween.easing(TWEEN.Easing.Sinusoidal.InOut);
            tween.start(); 
            resolve();
          }, 10));
        }; 
         async function view6_Fun() {                                      
          const spinnedFn = useSpinner(view6_fn, {
           container: container_3d
         });      
         // execute with a loading spinner
         await spinnedFn();
       }              
      let view6=document.getElementById("Camera_Near_Chair");   
        view6.addEventListener("change", (e) => {
          if (e.target.checked) { 
            view6_Fun();                  
         }
        })      

}
 
export { viewPoints };
