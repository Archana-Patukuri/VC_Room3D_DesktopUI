
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import {
    PlaneGeometry,    
    Color 
  } from "three";
import { Reflector } from '../../node_modules/three/examples/jsm/objects/Reflector.js';
import useSpinner from '../../use-spinner';
import '../../use-spinner/assets/use-spinner.css';
let container_3d=document.getElementById("3dcontainer");
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
    
    const Reflections_Floor_Add_fn = async () => {
        await new Promise(resolve => setTimeout(() => {                            
          scene.add( groundMirror );
          Floor.material.transparent=true;                                                                                                                                                 
          resolve();
        }, 10));
      };       
      let gui_ref=document.getElementById("gui_ref");
      gui_ref.addEventListener("click",function(e){
        if(e.target.checked){
          const params = {                                      
            opacity:0.7,
            color:1,
             width_Height:0.1,
             samples:4               
          };  
          if(gui)gui.destroy()                 
          gui = new GUI();
          const shadowFolder = gui.addFolder( 'Floor Reflections' );                 
          shadowFolder.add( params, 'opacity', 0, 1, 0.01 ).onChange( function () {
            Floor.material.opacity = params.opacity;            
          } );  
          shadowFolder.add( params, 'color', 0, 1, 0.001 ).onChange( function () {
            Floor.material.color=new Color(params.color,params.color,params.color)          
          } );  
          shadowFolder.add( params, 'width_Height', 0, 1, 0.001 ).onChange( function () {
            groundMirror.getRenderTarget().setSize(
              window.innerWidth * window.devicePixelRatio*params.width_Height,
              window.innerHeight * window.devicePixelRatio*params.width_Height
            );   
          } );  
          shadowFolder.add( params, 'samples', 0, 10, 1 ).onChange( function () {
            groundMirror.getRenderTarget().samples=params.samples;
          } );     
                                                                         
        }else{
          gui.hide();
        }
      })
      async function Reflections_Floor_Add() {                                      
        const spinnedFn = useSpinner(Reflections_Floor_Add_fn, {
         container: container_3d
       });             
       // execute with a loading spinner
       await spinnedFn();      
     }         
      const Reflections_Floor_Remove_fn = async () => {
        await new Promise(resolve => setTimeout(() => {
            Floor.material.transparent=false;
            scene.remove( groundMirror );
          if(gui)gui.hide();
          resolve();
        }, 10));
      }; 
      async function Reflections_Floor_Remove() {                                      
        const spinnedFn = useSpinner(Reflections_Floor_Remove_fn, {
         container: container_3d
       });      
       // execute with a loading spinner
       await spinnedFn();
     }    

      const ReflectionsMirror_Add_fn = async () => {
        await new Promise(resolve => setTimeout(() => {
            scene.add( verticalMirror );   
          resolve();
        }, 10));
      }; 
      async function ReflectionsMirror_Add() {                                      
        const spinnedFn = useSpinner(ReflectionsMirror_Add_fn, {
         container: container_3d
       });      
       // execute with a loading spinner
       await spinnedFn();
     }    
      const ReflectionsMirror_Remove_fn = async () => {
        await new Promise(resolve => setTimeout(() => {
            scene.remove( verticalMirror ); 
          resolve();
        }, 10));
      }; 
      async function ReflectionsMirror_Remove() {                                      
        const spinnedFn = useSpinner(ReflectionsMirror_Remove_fn, {
         container: container_3d
       });      
       // execute with a loading spinner
       await spinnedFn();
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