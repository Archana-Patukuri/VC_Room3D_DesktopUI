import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
let mobile = false;
if (/Android|iPhone/i.test(navigator.userAgent)) {
  mobile = true;
}

function viewPoints(camera) {
  function view1_Fun(){
    var tween = new TWEEN.Tween(camera.position).to({
      x: 0.01,
      y: 2.165,
      z: 4.73}, 1500);          
    tween.easing(TWEEN.Easing.Sinusoidal.InOut);
    tween.start();   
  }
  function view2_Fun(){
    var tween = new TWEEN.Tween(camera.position).to({
      x: 0.479,
      y: 1.065,
      z: 6.433}, 1500);
    tween.easing(TWEEN.Easing.Sinusoidal.InOut);
    tween.start(); 
  }
  function view3_Fun(){
    var tween = new TWEEN.Tween(camera.position).to({
      x: 0,
      y: 2.165,
      z: -4.5}, 1500);
    tween.easing(TWEEN.Easing.Sinusoidal.InOut);
    tween.start();  
  }
  function view4_Fun(){
    var tween = new TWEEN.Tween(camera.position).to({
      x: 0.479,
      y: 2.165,
      z: 3.033}, 1500);
    tween.easing(TWEEN.Easing.Sinusoidal.InOut);
    tween.start(); 
  }
  function view5_Fun(){
    var tween = new TWEEN.Tween(camera.position).to({
      x: 2.479,
      y: 2.165,
      z: 2.433}, 1500);
    tween.easing(TWEEN.Easing.Sinusoidal.InOut);
    tween.start();    
  }
  function view6_Fun(){
    var tween = new TWEEN.Tween(camera.position).to({
      x: 3.479,
      y: 0.165,
      z: 0}, 1500);
    tween.easing(TWEEN.Easing.Sinusoidal.InOut);
    tween.start(); 
  }
  
   
if(mobile){
    let viewPoints_Mobile=document.querySelectorAll(".viewPoints_Mobile")
    viewPoints_Mobile[0].addEventListener("change", (e) => {
      if (e.target.checked) {                                            
        view1_Fun();
    }
    })   
    viewPoints_Mobile[4].addEventListener("change", (e) => {
      if (e.target.checked) {                                            
        view2_Fun();
    }
    })   
    viewPoints_Mobile[5].addEventListener("change", (e) => {
      if (e.target.checked) {                                            
        view3_Fun();
    }
    })   
    viewPoints_Mobile[1].addEventListener("change", (e) => {
      if (e.target.checked) {                                            
        view4_Fun();
    }
    })   
    viewPoints_Mobile[3].addEventListener("change", (e) => {
      if (e.target.checked) {                                            
        view5_Fun();
    }
    })   
    viewPoints_Mobile[2].addEventListener("change", (e) => {
      if (e.target.checked) {                                            
        view6_Fun();
    }
    })       
  }else{
    let Viewpoints_Desktop=document.querySelectorAll(".Viewpoints_Desktop");
    Viewpoints_Desktop[0].addEventListener("change", (e) => {
      if (e.target.checked) {                                            
        view1_Fun();
    }
    })   
    Viewpoints_Desktop[4].addEventListener("change", (e) => {
      if (e.target.checked) {                                            
        view2_Fun();
    }
    })   
    Viewpoints_Desktop[5].addEventListener("change", (e) => {
      if (e.target.checked) {                                            
        view3_Fun();
    }
    })   
    Viewpoints_Desktop[1].addEventListener("change", (e) => {
      if (e.target.checked) {                                            
        view4_Fun();
    }
    })   
    Viewpoints_Desktop[3].addEventListener("change", (e) => {
      if (e.target.checked) {                                            
        view5_Fun();
    }
    })   
    Viewpoints_Desktop[2].addEventListener("change", (e) => {
      if (e.target.checked) {                                            
        view6_Fun();
    }
    })       

  }
    
}
 
export { viewPoints };
