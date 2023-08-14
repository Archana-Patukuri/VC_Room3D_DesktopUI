import Stats from "../../node_modules/three/examples/jsm/libs/stats.module.js";
import useSpinner from '../../use-spinner';
import '../../use-spinner/assets/use-spinner.css';
let container_3d=document.getElementById("3dcontainer");
let stats   
class Debug { 

  displayStats() {
    //SHOW FPS
    stats = new Stats();  
    let stats_ui=document.getElementById("Stats");    
    const stats_ui_fn = async () => {
      await new Promise(resolve => setTimeout(() => {        
        document.body.appendChild(stats.dom);         
        resolve();
      }, 10));
    }; 
    async function stats_ui_Fun() {                                      
      const spinnedFn = useSpinner(stats_ui_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();       
   }       
   const stats_ui_else_fn = async () => {
    await new Promise(resolve => setTimeout(() => {
      document.body.removeChild(stats.dom);
      resolve();
    }, 10));
  }; 
  async function stats_ui_else_Fun() {                                      
    const spinnedFn = useSpinner(stats_ui_else_fn, {
     container: container_3d
   });      
   // execute with a loading spinner
   await spinnedFn();
 }       
    stats_ui.addEventListener("click",function(e){
      if(e.target.checked){
        stats_ui_Fun()   
      }else{
        stats_ui_else_Fun()
      }
    })
    
    
  }
  update(renderer) {    
    stats.update();   
  }
}

export { Debug };
