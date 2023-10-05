
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import {
    PlaneGeometry,    
    Color 
  } from "three";
import { Reflector } from '../../node_modules/three/examples/jsm/objects/Reflector.js';
function reflection(scene,clock,gui) {
    let groundMirror,verticalMirror,Floor ;          
    let geometry = new PlaneGeometry( 3.88, 3.88 );  
    Floor = scene.getObjectByName('Floor');    
    Floor.material.opacity=0.7;   
    Floor.material.transparent=true;   
    
    groundMirror = new Reflector( geometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio*0.5,
    textureHeight: window.innerHeight * window.devicePixelRatio*0.5,
    color: 0x888888,
    multisample:4,
    } );           
    groundMirror.position.y = -0.001;
    groundMirror.position.z=0.43;
    groundMirror.position.x=0.08;
    groundMirror.rotateX( -Math.PI/2 );                         

    let geometry1 = new PlaneGeometry( 0.52, 0.7 );        
    verticalMirror = new Reflector(geometry1, {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio*0.1,
        textureHeight: window.innerHeight * window.devicePixelRatio*0.1,        
        color: 0x889999,
        multisample:4
    } );        
  
    verticalMirror.position.x = 0.1;
    verticalMirror.position.y = 1.83;    
    verticalMirror.position.z = -1.46; 
    
    function Reflections_Floor_Add(){
      scene.add( groundMirror );
      Floor.material.transparent=true;      
    }     
      function Reflections_Floor_Remove(){
        Floor.material.transparent=false;
        scene.remove( groundMirror );
      if(gui)gui.hide();
      }     
     function ReflectionsMirror_Add(){
      scene.add( verticalMirror );   
     }
     function ReflectionsMirror_Remove(){
      scene.remove( verticalMirror ); 
     }                   
    let ReflectionsMirror_C=document.getElementById("ReflectionsMirror_C");   
    ReflectionsMirror_C.addEventListener("change",(e)=>{
        if(e.target.checked){                  
            ReflectionsMirror_Add();            
        }else{             
            ReflectionsMirror_Remove();
        }
    })    
    Reflections_Floor_Add();  
    let ReflectionsFloor_C=document.getElementById("ReflectionsFloor_C");      
    ReflectionsFloor_C.addEventListener("change",(e)=>{
        if(e.target.checked){                                     
            Reflections_Floor_Add();                        
        }else{
            Reflections_Floor_Remove();                                
        }
    })   
}

export { reflection };