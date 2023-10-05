import Stats from "../../node_modules/three/examples/jsm/libs/stats.module.js";
let stats   
class Debug { 

  displayStats() {
    //SHOW FPS
    stats = new Stats();  
    let stats_ui=document.getElementById("Stats"); 
    function stats_ui_Fun(){
      document.body.appendChild(stats.dom);  
    }
    function stats_ui_else_Fun(){
      document.body.removeChild(stats.dom);
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
