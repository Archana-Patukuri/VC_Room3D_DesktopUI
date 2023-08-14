import { World } from "./three_js/World.js";
import { Clock } from "three";
let mobile = false;
if (/Android|iPhone/i.test(navigator.userAgent)) {
  mobile = true;
}
let clock = new Clock();
let delta;
async function main() {  

  
  const world = new World();
  world.createUI();  
  world.loadBackground();
  
  await world.loadRoomGLTF() 
  await world.loadBlindsGLTF()
  await world.loadLightsGLTF()
   
  world.createTransfromCtrls();
  world.createPostProcess();
  world.createMeasurements();   
  world.start(); 
  if(mobile){
  let Spinner = document.getElementById("Spinner");     

  let load_furniture_btn=document.getElementById("load_furniture_btn");
  load_furniture_btn.addEventListener("click",async function(){
    delta = clock.getDelta();
    Spinner.style.display="block";
    await Promise.all([                 
      await world.loadTableGLTF(),                              
      await world.loadChairGLTF(),              
    ]);      
    Spinner.style.display="none";
    delta = clock.getDelta();
    console.log("furniture loading time = ",delta.toPrecision(3),"secs")        
  })
  let lighting_etc_btn=document.getElementById("lighting_etc_btn");
  lighting_etc_btn.addEventListener("click",async function(){
    delta = clock.getDelta();
    Spinner.style.display="block";
    await Promise.all([                                                                      
      await world.loadCylindricalLight(), 
      await world.lightPresets()      
    ]);       
    
  Spinner.style.display="none"; 
  delta = clock.getDelta();
  console.log("lighting loading time = ",delta.toPrecision(3),"secs") 
  })
  let load_everything_btn=document.getElementById("load_Accessories_btn");
  load_everything_btn.addEventListener("click",async function(){
    delta = clock.getDelta();
    Spinner.style.display="block"; 
    await Promise.all([                                   
      await world.loadPlants(),
      await world.loadMirrorGLTF(),  
      await world.loadAccessoriesGLTF(),
      await world.loadWallPlantsGLTF()  
    ]);                               
    Spinner.style.display="none"; 
    delta = clock.getDelta();
    console.log("accessories loading time = ",delta.toPrecision(3),"secs") 
    })
  }

}

main().catch((err) => {
  console.error(err);
});


