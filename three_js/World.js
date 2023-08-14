import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";
import { createCameraControls } from "./systems/cameraControls.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { reflection } from "./systems/reflection.js";
import { lightControls } from "./systems/lightControls.js";
import { viewPoints } from "./systems/viewpoints.js";
import { basicControls } from "./systems/basicControls.js";
import { resetAndHelp } from "./systems/resetAndHelp.js";
import {shadows} from "./systems/shadows.js";

import  hdriLoad  from "./components/hdri_loader/hdri_loader.js";
import { Debug } from "./systems/Debug.js";

import LightStore from './store/lightStore';
let a=0,n=0;
import {
  Box3, 
  Clock,
  Group,  
  Mesh,
  MeshStandardMaterial,
  Raycaster,
  SphereGeometry,
  Vector2,
  Vector3,
  AmbientLight,
  Color,
  DirectionalLight,  
  RectAreaLight,   
  TextureLoader,  
} from "three";
import * as THREE from 'three';
import { createEffectComposer } from "./systems/effectComposer.js";

import { GammaCorrectionShader } from '../node_modules/three/examples/jsm/shaders/GammaCorrectionShader.js'; 
import { RenderPass } from '../node_modules/three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from '../node_modules/three/examples/jsm/postprocessing/ShaderPass.js';
import { TAARenderPass } from '../node_modules/three/examples/jsm/postprocessing/TAARenderPass.js';
import { FXAAShader } from '../node_modules/three/examples/jsm/shaders/FXAAShader.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';

import { OutlinePass } from '../node_modules/three/examples/jsm/postprocessing/OutlinePass.js';
import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
import { SAOPass } from 'three/addons/postprocessing/SAOPass.js';
import { SSAARenderPass } from 'three/addons/postprocessing/SSAARenderPass.js';
import { SSRPass } from 'three/addons/postprocessing/SSRPass.js';
import { ReflectorForSSRPass } from 'three/addons/objects/ReflectorForSSRPass.js';

import { TransformControls } from '../node_modules/three/examples/jsm/controls/TransformControls.js';
import { FurnitureContainer } from "./components/furnitureContainers/FurnitureContainer.js";
import { LightContainer } from "./components/furnitureContainers/LightContainer.js";
import { exportScene } from "./systems/export.js";

import { gltfLoad } from "./components/gltf_loader/gltfLoad.js";

import assets from "./dataBase/assets.json" assert { type: "json" };

import { Line2 } from "../node_modules/three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "../node_modules/three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "../node_modules/three/examples/jsm/lines/LineGeometry.js";

import { CSS2DRenderer, CSS2DObject } from '../measurements-files/CSS2DRenderer.js';
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import useSpinner from '../use-spinner';
import '../use-spinner/assets/use-spinner.css';
import eruda from "eruda";

let container_3d=document.getElementById("3dcontainer");
let lineId = 0 
let measurementDiv
const measurementLabels = []

let prompt=document.getElementById("ar-prompt");

const container = document.querySelector("#scene-container");
const labelRenderer = new CSS2DRenderer()
labelRenderer.setSize(container.clientWidth, container.clientHeight);
labelRenderer.domElement.style.position = 'absolute'
labelRenderer.domElement.style.top = '0px'
labelRenderer.domElement.style.pointerEvents = 'none'
container.appendChild(labelRenderer.domElement); 

let ambientLightSun
let shadowLight;
let camera;
let renderer;
let scene;
let cameraControls;
let debug;
let clock;
let plantsParent, lampsParent,mirrorParent,vaseParent,laptopParent,fanParent;
let composer;
let chairModels, tableModels, blindsModels,lightsModels;
let cylindricalLampSpotLight_1,cylindricalLampSpotLight_2,cylindricalLampSpotLight_3,cylindricalLampSpotLight_4
let gui;   

let mouse = new Vector2();

let raycaster = new Raycaster();
let selectedObjects = [];
let selectableObjects = [];

let transformControl;
let box,outlinePass,effectFXAA;

let chairsUIContainer = document.getElementById("chairTypesUI");
let tablesUIContainer = document.getElementById("tableTypesUI");
let blindsUIContainer = document.getElementById("blindsTypesUI");
let lightsUIContainer = document.getElementById("lightsTypesUI");
let UIContainer;
let roomParent;
let sunLight

let dayLightSettings, nightLightSettings1;

let delta;

plantsParent = new Group();
plantsParent.name="selectable";

mirrorParent=new Group();
mirrorParent.name="selectable";

vaseParent=new Group();
vaseParent.name="selectable";

lampsParent=new Group();
lampsParent.name="selectable";

laptopParent=new Group();
laptopParent.name="selectable";
let rectAreaLights = [];

let mobile = false;
if (/Android|iPhone/i.test(navigator.userAgent)) {
  mobile = true;
}
let HDRI=document.getElementById("HDRI");
let Emissive=document.getElementById("Emissive");
const stateList = {"HDRI":HDRI,
 "Emissive":Emissive };
 
 let gui_ui=document.getElementById("gui_ui"); 
 let start,millis;
start = Date.now();
console.log("timer started")
let preset_val=0, fanLight ;

class World {
  constructor() {        
    this.container = container;
    UIContainer = container;


    labelRenderer.setSize(container.clientWidth, container.clientHeight)

    scene = createScene();

    this.lightState = new LightStore(scene);
    renderer = createRenderer(this.lightState);

    // renderer = createRenderer();
     renderer.info.autoReset = false;
    composer = createEffectComposer(renderer);          

    camera = createCamera(); 
    scene.add(camera);    
    camera.layers.enable(0);
    camera.layers.enable(2);
       
   renderer.domElement.addEventListener( 'pointermove', (e) => {
    prompt.style.display="none";
  });   
    const grid = new THREE.GridHelper( 10, 20, 0x000000, 0x000000 );
    grid.material.opacity = .5;
    grid.position.y = - 0.02;
    grid.material.transparent = true;
    scene.add( grid );   
    
    var script = document.createElement('script');  
    script.src="//cdn.jsdelivr.net/npm/eruda"; 
        document.body.appendChild(script);            
           script.onload = function () {            
             eruda.init();  
             eruda.destroy()            
           }      
           
    const console_fn = async () => {
      await new Promise(resolve => setTimeout(() => {
        eruda.init();
        resolve();
      }, 10));
    }; 
    async function console_Fun() {                                      
      const spinnedFn = useSpinner(console_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();
   }          
      const console_Else_fn = async () => {
        await new Promise(resolve => setTimeout(() => {              
         eruda.destroy()                    
          resolve();
        }, 10));
      }; 
      async function console_Else_Fun() {                                      
        const spinnedFn = useSpinner(console_Else_fn, {
         container: container_3d
       });      
       // execute with a loading spinner
       await spinnedFn();
     }    
      
      let ConsoleObj=document.getElementById("Console");
      ConsoleObj.addEventListener("change",(e)=>{            
        if(e.target.checked){                                
          console_Fun();
        }else{          
          console_Else_Fun();                  
        }
      })   
    box = new Box3();        

    fanParent=new Group();
    fanParent.name="selectable";

    roomParent = new Group();       

    clock = new Clock();
    //Parent Object where the loaded GLTF Models will be added
   
   
    chairModels = new FurnitureContainer(
      assets.Chairs,
      chairsUIContainer,
      "chairs",
      "0",
      scene,
      renderer          
    );
    tableModels = new FurnitureContainer(
      assets.Tables,
      tablesUIContainer,
      "tables",
      "0", 
      scene,
      renderer      
    );        

     blindsModels = new FurnitureContainer(
      assets.Blinds,
      blindsUIContainer,
      "windowBlinds",
      "0",  
      scene,
      renderer,
      clock                   
    ); 
    
     lightsModels = new LightContainer(
      assets.Lights,
      lightsUIContainer,
      "lights",
      "0",
      selectableObjects,      
      scene,
      renderer
    );    
    //for adding Helpers and FPS
    debug = new Debug();    
    
    ambientLightSun = new AmbientLight();
    ambientLightSun.color = new Color(0xffffff);    
    scene.add(ambientLightSun);
    ambientLightSun.name = "ambientLightSun"

    RectAreaLightUniformsLib.init();
    renderer.toneMappingExposure = 1; 

    
    for (let i = 0; i < 4; i++) {
      const rectLight = new RectAreaLight(0xffffff, 0.1, 3, 0.15);
      rectAreaLights.push(rectLight);
      // scene.add(rectLight);
    }

    rectAreaLights[0].position.set(0.085, 2.97, 1.9525);
    rectAreaLights[1].position.set(0.085, 2.97, -1.0855);
    rectAreaLights[1].rotateY(Math.PI);

    rectAreaLights[2].position.set(1.58, 2.97, 0.45);
    rectAreaLights[2].rotateY(Math.PI / 2);

    rectAreaLights[3].position.set(-1.41, 2.97, 0.45);
    rectAreaLights[3].rotateY(-Math.PI / 2);                             

    //WINDOW RESIZER
    const resizer = new Resizer(container, camera, renderer, composer,labelRenderer);
    container.append(renderer.domElement);
    //Orbit Controlls for Camera
    cameraControls = createCameraControls(camera, renderer.domElement);
    camera.position.set(0.01,2.165,4.73);      
    camera.updateMatrixWorld();
    camera.name="PerspectiveCamera"    
    basicControls(scene,camera,cameraControls,renderer);       
    resetAndHelp(camera);  
    
  
  } 
  createUI() {
    //created FurnitureTypesUI from JSON data
    tableModels.createUI();
    chairModels.createUI();
    blindsModels.createUI();
    lightsModels.createUI();
  }  
  async loadBackground() {           
      scene.background = new Color(1,1,1);                
  }
  //LoadRoom
  async loadRoomGLTF() {
    delta = clock.getDelta();   
         
    let modelURL = await fetch(assets.Room[0].URL); 
    let { gltfData } = await gltfLoad(modelURL.url);
    let loadedmodel = gltfData.scene;        
    roomParent.add(loadedmodel); 
    
   let themesDiv=document.getElementById("themesDiv");      
    for (let i = 0; i < gltfData.userData.variants.length; i++) {
      let div2 = document.createElement("div");
      div2.className = "d-flex flex-row"; 
     let input = document.createElement("input");
      input.type = "radio";
      input.value = gltfData.userData.variants[i];
      input.className = "form-check-input largerCheckbox";      
      input.name=gltfData.userData.variants[i].name;      
      input.id = gltfData.userData.variants[i]; 

      let label = document.createElement("label");
      label.className = "mt-1";
      label.setAttribute("for", gltfData.userData.variants[i]);
      label.innerHTML=gltfData.userData.variants[i]

      div2.appendChild(input);
      div2.appendChild(label);
      themesDiv.appendChild(div2);       
       async function input_var_Fun(){
        let myPromise = new Promise(function(resolve) {                                                                        
          gltfData.functions.selectVariant(gltfData.scene,gltfData.userData.variants[i] );         
          reflection(scene,clock,gui);                  
        });                
        await myPromise;                 
      }                   
      input.addEventListener("click", function (e) {  
        if(e.target.checked){                             
          input_var_Fun(); 
        }        
      });            
      if(input.id=="Theme_1"){
        input.checked=true;                          
      }
      
    }
   
    let fan=roomParent.children[0].children[6]
    fanParent.add(fan)      
    for (let i = 0; i < loadedmodel.children.length; i++) {
      if (loadedmodel.children[i].name == "BlindsPosition") {
        let blindsPos = loadedmodel.children[i].position;
        blindsModels.parentGroup.position.copy(blindsPos);        
      }
    }    
    roomParent.add(fanParent)     
    scene.add(fanParent)    
    scene.add(roomParent);  
    selectableObjects.push(fanParent);  
    fanLight = scene.getObjectByName("fanLight"); 
    fanLight.intensity=30                        
    renderer.render(scene, camera);    
    console.log("room loaded",delta.toPrecision(3),"seconds")    
  }    
async loadTableGLTF() {  
  await tableModels.loadModel();  
  tableModels.parentGroup.position.set(0, 0, 0.5);  
  selectableObjects.push(tableModels.parentGroup);
  scene.add(tableModels.parentGroup) 
  renderer.render(scene, camera);
  delta = clock.getDelta();
  console.log("table loaded",delta.toPrecision(3),"seconds")  
}
//LoadLights
async loadLightsGLTF() {
  delta = clock.getDelta(); 
    
  await lightsModels.loadModel();  
                
  if(lightsModels.assetsList[1].Name=="Floor Light"){  
    scene.add(lightsModels.parentGroup)  
    selectableObjects.push(lightsModels.parentGroup);      
  }
  if(lightsModels.assetsList[2].Name=="Wall Light"){  
    scene.add(lightsModels.parentGroup2)  
    selectableObjects.push(lightsModels.parentGroup2);      
  } 

  renderer.render(scene, camera);   
}            

  //LoadBlinds
  async loadBlindsGLTF() {
    delta = clock.getDelta();    
    await blindsModels.loadModel();
    scene.add(blindsModels.parentGroup);
    selectableObjects.push(blindsModels.parentGroup);   
    renderer.render(scene, camera);    
    console.log("window blinds loaded",delta.toPrecision(3),"seconds")
  }
  //LoadChair
  async loadChairGLTF() {
    /*  await chairModels.loadModel();    
    chairModels.parentGroup.position.set(0, 0, -0.5);
    scene.add(chairModels.parentGroup);    
    selectableObjects.push(chairModels.parentGroup);    
    renderer.render(scene, camera);   */
      if (window.Worker) {
      const myWorker = new Worker("webworker.js");      
      myWorker.postMessage("Chair");                  
    
      myWorker.onmessage =async function(e) { 
        if(e.data=="Chair"){                  
        await chairModels.loadModel();    
        chairModels.parentGroup.position.set(0, 0, -0.5);
        scene.add(chairModels.parentGroup);    
        selectableObjects.push(chairModels.parentGroup);    
        renderer.render(scene, camera);  
        }      
      }
    } else {
      console.log('Your browser doesn\'t support web workers.');
    }            
    delta = clock.getDelta(); 
    console.log("chair loaded using web worker",delta.toPrecision(3),"seconds");
  }    
  //LoadPlants
  async loadPlants() { 
    
   /*  let modelURL = await fetch(assets.Plants[0].URL);
    const { gltfData } = await gltfLoad(modelURL.url);
    const loadedmodel = gltfData.scene;     
    const plant1 = loadedmodel;    
    plantsParent.add(plant1);  
    scene.add(plantsParent);     
    selectableObjects.push(plantsParent);  */
    if (window.Worker) {
      const myWorker = new Worker("webworker.js");
      let modelURL = await fetch(assets.Plants[0].URL);
        if(modelURL){
          myWorker.postMessage(modelURL.url);          
        }
    
      myWorker.onmessage =async function(e) {               
        const { gltfData } = await gltfLoad(e.data);
        const loadedmodel = gltfData.scene;     
        const plant1 = loadedmodel;    
        plantsParent.add(plant1);  
        scene.add(plantsParent);     
        selectableObjects.push(plantsParent);   
        renderer.render(scene, camera);
       }
    } else {
      console.log('Your browser doesn\'t support web workers.');
    } 
    delta = clock.getDelta();  
    console.log("plants model added to scene using web worker in ",delta.toPrecision(3),"seconds")       
            
    
  }  
  async loadCylindricalLight() {        
    delta = clock.getDelta();
    let modelURL = await fetch(assets.Lights_2[0].URL);
    const { gltfData } = await gltfLoad(modelURL.url);
    const loadedmodel = gltfData.scene;
    const cylindricalLight1 = loadedmodel;
    scene.add(cylindricalLight1);
    selectableObjects.push(cylindricalLight1)
    cylindricalLampSpotLight_1 = scene.getObjectByName(
      "Cylindrical_spot_light_1"
    );
     cylindricalLampSpotLight_2 = scene.getObjectByName(
      "Cylindrical_spot_light_2"
    );
     cylindricalLampSpotLight_3 = scene.getObjectByName(
      "Cylindrical_spot_light_3"
    );
   cylindricalLampSpotLight_4 = scene.getObjectByName(
      "Cylindrical_spot_light_4"
    );
    renderer.render(scene, camera)
    console.log("cylindrical wall lamps loaded",delta.toPrecision(3),"seconds")
  }
  //LoadMirror
  async loadMirrorGLTF() {
     
    let modelURL = await fetch(assets.Mirror[0].URL);    

    const { gltfData } = await gltfLoad(modelURL.url); 
    const loadedmodel = gltfData.scene; 
    const mirror = loadedmodel;   
    mirrorParent.add(mirror)   
    scene.add(mirrorParent);    
    selectableObjects.push(mirrorParent);           
    renderer.render(scene, camera);   
    delta = clock.getDelta();  
    console.log("mirror loaded",delta.toPrecision(3),"seconds");
    
  } 
  async loadAccessoriesGLTF() {
     
    let modelURL = await fetch(assets.Accessories[0].URL);    

    const { gltfData } = await gltfLoad(modelURL.url); 
    const loadedmodel = gltfData.scene;  
    // loadedmodel.position.set()      
    scene.add(loadedmodel);        
    renderer.render(scene, camera); 
    delta = clock.getDelta();    
    console.log("frames loaded",delta.toPrecision(3),"seconds");
    
  } 
  async loadWallPlantsGLTF() {
     
    let modelURL = await fetch(assets.Accessories[1].URL);    

    const { gltfData } = await gltfLoad(modelURL.url); 
    const loadedmodel = gltfData.scene;  
    // loadedmodel.position.set()      
    scene.add(loadedmodel);        
    renderer.render(scene, camera); 
    delta = clock.getDelta();    
    console.log("wall plants loaded",delta.toPrecision(3),"seconds");
    
  }    
  async lightPresets() {      

   
  let tableLamp = scene.getObjectByName("Desktop_Lamp_Light002");                               
  let sunLight = scene.getObjectByName("Sun");    

    dayLightSettings = function (hdri1) {            
      console.time("DayLight Preset time"); 
       scene.background = new Color(0xffffff);   
       if(tableLamp && fanLight && cylindricalLampSpotLight_1){
        tableLamp.intensity = 0;
        fanLight.intensity = 0;            
        cylindricalLampSpotLight_1.intensity = 0;
        cylindricalLampSpotLight_2.intensity = 0;
        cylindricalLampSpotLight_3.intensity = 0;
        cylindricalLampSpotLight_4.intensity = 0;    
       }       
                           
                        
      sunLight.intensity = 30;          
    
      shadowLight=0;        
      shadows(scene,shadowLight);  
      scene.environment = hdri1;  
      renderer.toneMappingExposure=0.2;  
      n=n+1 
      
    };   
            
    nightLightSettings1 = function (hdri0) { 
      console.time("NightLight Preset time");                
      renderer.toneMappingExposure = 1;                                     
         
      sunLight.intensity = 0;
      ambientLightSun.intensity = 0;   
      scene.environment = hdri0;      
      scene.background = new Color(0x000000); 

      fanLight.intensity = 30;
      if(cylindricalLampSpotLight_1){
      cylindricalLampSpotLight_1.intensity = 2;
      cylindricalLampSpotLight_2.intensity = 2;
      cylindricalLampSpotLight_3.intensity = 2;
      cylindricalLampSpotLight_4.intensity = 2;
      }   
      /*  if(a==1){
          shadowLight=3;
        shadows(scene,shadowLight); 
      }else{  */
       /*  shadowLight=1;
        shadows(scene,shadowLight); */
      // } 
           
      a=a+1               
    };
   
    const dayLightSettings_fn = async () => {
      const { hdri1 } = await hdriLoad();           
      await new Promise(resolve => setTimeout(() => {
        dayLightSettings(hdri1);
        resolve();
      }, 10));  
    }; 
    async function dayLightSettings_Fun() {                                      
      const spinnedFn = useSpinner(dayLightSettings_fn, {
       container: container_3d
     });      
     // execute with a loading spinner     
     await spinnedFn(); 
     console.timeEnd("DayLight Preset time"); 
   
   }       
    let lightsPresetsUI = document.querySelectorAll(".lightPreset");
    lightsPresetsUI[0].addEventListener('change',function(){
      if (this.value == "DayLightPreset") {
        dayLightSettings_Fun();        
      } 
    })
    
    const NightLight1_fn = async () => {
      const {hdri0 } = await hdriLoad();       
      await new Promise(resolve => setTimeout(() => {
        nightLightSettings1(hdri0);
        resolve();
      }, 10));
    }; 
    async function NightLight1_Fun() {                                      
      const spinnedFn = useSpinner(NightLight1_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();         
                
   }       
    
    lightsPresetsUI[1].addEventListener('change',function(){
      if (this.value == "NightLight1") {
        NightLight1_Fun();
      } 
    })     

    NightLight1_Fun();        

    if(mobile){
      lightControls(
        scene,
        renderer,
        prompt,
        sunLight,
        ambientLightSun,
        camera,
        clock,
        stateList,
        gui,
        this.lightState,
        fanLight,
        [cylindricalLampSpotLight_1,cylindricalLampSpotLight_2,cylindricalLampSpotLight_3,cylindricalLampSpotLight_4],
      );
    }

  }
  //CreatePostProcess Effects
  createPostProcess() {        
    const renderPass = new RenderPass(scene, camera);
    //Disable Render Pass
    // renderPass.enabled = false;         
    composer.addPass(renderPass);                       
    let taaRenderPass
    const TAA_fn = async () => {
      await new Promise(resolve => setTimeout(() => {
        delta = clock.getDelta();
        //TAA pass for Antialiasing
        taaRenderPass = new TAARenderPass(scene, camera);   
        taaRenderPass.sampleLevel = 1;  
        const param = { TAAEnabled: '1', TAASampleLevel: 0 };
        if ( gui ) gui.destroy();
        gui = new GUI();         
        gui.add( param, 'TAAEnabled', {
					'Disabled': '0',
					'Enabled': '1'
				} ).onFinishChange( function () {

					if ( taaRenderPass ) {

						taaRenderPass.enabled = ( param.TAAEnabled === '1' );
						renderPass.enabled = ( param.TAAEnabled !== '1' );

					}

				} );

				gui.add( param, 'TAASampleLevel', {
					'Level 0: 1 Sample': 0,
					'Level 1: 2 Samples': 1,
					'Level 2: 4 Samples': 2,
					'Level 3: 8 Samples': 3,
					'Level 4: 16 Samples': 4,
					'Level 5: 32 Samples': 5
				} ).onFinishChange( function () {

					if ( taaRenderPass ) {

						taaRenderPass.sampleLevel = param.TAASampleLevel;

					}          
				} );
        gui_ui.checked=true;
        resolve();
      }, 10));
    }; 
    async function TAA_Fun() {                                      
      const spinnedFn = useSpinner(TAA_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();
     console.log("TAA enabled",delta.toPrecision(3),"seconds");
   }          
   const TAA_else_fn = async () => {
    await new Promise(resolve => setTimeout(() => {
      delta = clock.getDelta();
      taaRenderPass.sampleLevel = 0;      
      resolve();
    }, 10));
  }; 
  async function TAA_else_Fun() {                                      
    const spinnedFn = useSpinner(TAA_else_fn, {
     container: container_3d
   });      
   // execute with a loading spinner
   await spinnedFn();
   console.log("TAA disabled",delta.toPrecision(3),"seconds")
 }             
    let TAA_C=document.getElementById("TAA_C");
    TAA_C.addEventListener("click",function(e){
      if(e.target.checked){
        TAA_Fun()
      }else{
        TAA_else_Fun()
      }
    })   
    let FXAA_C=document.getElementById("FXAA_C");
    const FXAA_fn = async () => {
      await new Promise(resolve => setTimeout(() => {
        delta = clock.getDelta();
        effectFXAA = new ShaderPass( FXAAShader );
        effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );     
        composer.addPass( effectFXAA );
        resolve();
      }, 10));
    }; 
    async function FXAA_Fun() {                                      
      const spinnedFn = useSpinner(FXAA_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();
     console.log("FXAA enabled",delta.toPrecision(3),"seconds");
   }          
   const FXAA_else_fn = async () => {
    await new Promise(resolve => setTimeout(() => {
      delta = clock.getDelta();
      composer.removePass( effectFXAA );      
      resolve();
    }, 10));
  }; 
  async function FXAA_else_Fun() {                                      
    const spinnedFn = useSpinner(FXAA_else_fn, {
     container: container_3d
   });      
   // execute with a loading spinner
   await spinnedFn();
   console.log("FXAA disabled",delta.toPrecision(3),"seconds");
 }    
    FXAA_C.addEventListener("click",function(e){
      if(e.target.checked){
        FXAA_Fun()
      }else{
        FXAA_else_Fun()
      }
    })

    let ssaaRenderPass;				 
    let SSAA_C=document.getElementById("SSAA_C");
    const SSAA_fn = async () => {
      await new Promise(resolve => setTimeout(() => {
        delta = clock.getDelta();
        ssaaRenderPass = new SSAARenderPass( scene, camera );
        composer.addPass( ssaaRenderPass );
        const params = {
          sampleLevel: 4,
          renderToScreen: false,
          unbiased: true,
          camera: 'perspective',
          clearColor: 'black',
          clearAlpha: 1.0,
          viewOffsetX: 0,
          autoRotate: true
  
        };
        if ( gui ) gui.destroy();

				gui = new GUI();

				gui.add( params, 'unbiased' );
				gui.add( params, 'renderToScreen' );
				gui.add( params, 'sampleLevel', {
					'Level 0: 1 Sample': 0,
					'Level 1: 2 Samples': 1,
					'Level 2: 4 Samples': 2,
					'Level 3: 8 Samples': 3,
					'Level 4: 16 Samples': 4,
					'Level 5: 32 Samples': 5
				} );				
				gui.add( params, 'clearColor', [ 'black', 'white', 'blue', 'green', 'red' ] );
				gui.add( params, 'clearAlpha', 0, 1 );
				gui.add( params, 'viewOffsetX', - 100, 100 );
				gui.add( params, 'autoRotate' );
        gui_ui.checked=true;

        resolve();
      }, 10));
    }; 
    async function SSAA_Fun() {                                      
      const spinnedFn = useSpinner(SSAA_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();
     console.log("SSAA enabled",delta.toPrecision(3),"seconds")
   }           
    const SSAA_Else_fn = async () => {
      await new Promise(resolve => setTimeout(() => {
        delta = clock.getDelta();
        composer.removePass( ssaaRenderPass );        
        resolve();
      }, 10));
    }; 
    async function SSAA_Else_Fun() {                                      
      const spinnedFn = useSpinner(SSAA_Else_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();
     console.log("SSAA disabled",delta.toPrecision(3),"seconds");
   }             
    SSAA_C.addEventListener("click",function(e){
      if(e.target.checked){
        SSAA_Fun()
      }else{
        SSAA_Else_Fun()
      }
    })
    let SMAApass;				   
    let start1,millis1
    let SMAA_C=document.getElementById("SMAA_C");
    let val=0
    const SMAA_fn = async () => {
      await new Promise(resolve => setTimeout(() => {        
        delta = clock.getDelta();
        start1 = Date.now();
         millis1 = Date.now() - start1;        
        console.log('SMAA loading Start time = ', millis1 ,'ms');
        //console.log("SMAA Before",delta.toPrecision(3),"seconds") 
        SMAApass = new SMAAPass( (window.innerWidth*0.1) * renderer.getPixelRatio(), (window.innerHeight*0.1) * renderer.getPixelRatio() );
        composer.addPass( SMAApass );     
        val=val+1               
        resolve();
      }, 10));
    }; 
    async function SMAA_Fun() {                                      
      const spinnedFn = useSpinner(SMAA_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();    
    millis1 = Date.now() - start1;     
     console.log('SMAA loading End time = ', millis1 ,'ms');
     //console.log("SMAA After",delta.toPrecision(3),"seconds") 
     if(val==1){
      prompt.style.display="block";
      const millis = Date.now() - start;
      console.log(`total loading time = ${Math.floor(millis / 1000)} seconds`); 
     
     }           
   }        
    const SMAA_Else_fn = async () => {
      await new Promise(resolve => setTimeout(() => {
        delta = clock.getDelta();
        composer.removePass( SMAApass );
        resolve();
      }, 10));
    }; 
    async function SMAA_Else_Fun() {                                      
      const spinnedFn = useSpinner(SMAA_Else_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();
     console.log("SMAA disabled",delta.toPrecision(3),"seconds");
   }            
   SMAA_Fun();
    SMAA_C.addEventListener("click",function(e){
      if(e.target.checked){
        SMAA_Fun();
       
      }else{
        SMAA_Else_Fun()
      }
    })     
    let ssaoPass;
    let SSAO_C=document.getElementById("SSAO_C");             
    const Ambient_Occlusion_fn = async () => {
      await new Promise(resolve => setTimeout(() => {
        delta = clock.getDelta();
        const width = container.clientWidth;
        const height = container.clientHeight;
        ssaoPass = new SSAOPass( scene, camera, width, height );
        composer.addPass( ssaoPass );        
        if ( gui ) gui.destroy();
        gui = new GUI();         
        const ssaoPass_folder = gui.addFolder( 'SSAO' );
        ssaoPass_folder.add( ssaoPass, 'kernelRadius' ).min( 0 ).max( 32 );
        ssaoPass_folder.add( ssaoPass, 'minDistance' ).min( 0.001 ).max( 0.02 );
        ssaoPass_folder.add( ssaoPass, 'maxDistance' ).min( 0.01 ).max( 0.3 );
        gui_ui.checked=true;
        resolve();
      }, 10));
    }; 
    async function Ambient_Occlusion_Fun() {                                      
      const spinnedFn = useSpinner(Ambient_Occlusion_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();
     console.log("SSAO enabled",delta.toPrecision(3),"seconds");
   }     
    const Ambient_Occlusion_Else_fn = async () => {
      await new Promise(resolve => setTimeout(() => {
        delta = clock.getDelta();
        composer.removePass( ssaoPass );                  
        resolve();
      }, 10));
    }; 
    async function Ambient_Occlusion_Else_Fun() {                                      
      const spinnedFn = useSpinner(Ambient_Occlusion_Else_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();
     console.log("SSAO disabled",delta.toPrecision(3),"seconds");
   }       
    SSAO_C.addEventListener("click",function(e){
      if(e.target.checked){
        Ambient_Occlusion_Fun()
      }else{
        Ambient_Occlusion_Else_Fun()
      }
    })

    let saoPass
    let SAO_C=document.getElementById("SAO_C");
    const Ambient_Occlusion_sao_fn = async () => {
      await new Promise(resolve => setTimeout(() => {  
        delta = clock.getDelta();    
        saoPass = new SAOPass( scene, camera, false, true );                  
        composer.addPass( saoPass ); 
        if ( gui ) gui.destroy();
        gui = new GUI();
        const saoPass_folder = gui.addFolder( 'SAO' );   	
      saoPass_folder.add( saoPass.params, 'saoBias', - 1, 1 );
      saoPass_folder.add( saoPass.params, 'saoIntensity', 0, 1 );
      saoPass_folder.add( saoPass.params, 'saoScale', 0, 10 );
      saoPass_folder.add( saoPass.params, 'saoKernelRadius', 1, 100 );
      saoPass_folder.add( saoPass.params, 'saoMinResolution', 0, 1 );
      saoPass_folder.add( saoPass.params, 'saoBlur' );
      saoPass_folder.add( saoPass.params, 'saoBlurRadius', 0, 200 );
      saoPass_folder.add( saoPass.params, 'saoBlurStdDev', 0.5, 150 );
      saoPass_folder.add( saoPass.params, 'saoBlurDepthCutoff', 0.0, 0.1 );
      gui_ui.checked=true;
        resolve();
      }, 10));
    }; 
    async function Ambient_Occlusion_sao_Fun() {                                      
      const spinnedFn = useSpinner(Ambient_Occlusion_sao_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();
     console.log("SAO enabled",delta.toPrecision(3),"seconds")
   }        
    const Ambient_Occlusion_sao_Else_fn = async () => {
      await new Promise(resolve => setTimeout(() => {
        delta = clock.getDelta();
        composer.removePass( saoPass );               
        resolve();
      }, 10));
    }; 
    async function Ambient_Occlusion_sao_Else_Fun() {                                      
      const spinnedFn = useSpinner(Ambient_Occlusion_sao_Else_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();
     console.log("SAO disabled",delta.toPrecision(3),"seconds");
   }        
    SAO_C.addEventListener("click",function(e){
      if(e.target.checked){
        Ambient_Occlusion_sao_Fun()
      }else{
        Ambient_Occlusion_sao_Else_Fun()
      }
    })              


    let groundReflector,ssrPass,geometry,selects
    let ssr_ui=document.getElementById("ssr_ui");
    function SSR_fun(){
      start = Date.now();
      millis = Date.now() - start;        
     console.log('SSR loading Start time = ', millis ,'ms');
     const params = {
      enableSSR: true,      
      groundReflector: true,
    };          
    
    geometry = new THREE.PlaneGeometry( 3.88, 3.88 );

      groundReflector = new ReflectorForSSRPass( geometry, {
        clipBias: 0.0003,
        textureWidth: window.innerWidth*0.1,
        textureHeight: window.innerHeight*0.1,
        color: 0x888888,
        // useDepthTexture: true,
      } );
      // groundReflector.material.depthWrite = false;
      groundReflector.rotation.x = - Math.PI / 2;
      groundReflector.position.y = -0.01;
      groundReflector.position.z=0.43;
      groundReflector.position.x=0.08; 

      // groundReflector.visible = true;
      let Floor = scene.getObjectByName('Floor');    
     Floor.material.opacity=0.5;   
     Floor.material.transparent=true;   
      

      ssrPass = new SSRPass( {
        renderer,
        scene,
        camera,
        width: innerWidth*0.1,
        height: innerHeight*0.1,
        groundReflector: params.groundReflector ? groundReflector : null,
        selects: params.groundReflector ? selects : null
      } );

     
       if(gui)gui.destroy();
      gui = new GUI( );
      gui.add( params, 'enableSSR' ).name( 'Enable SSR' );
      gui.add( params, 'groundReflector' ).onChange( () => {

        if ( params.groundReflector ) {

          ssrPass.groundReflector = groundReflector,
          ssrPass.selects = selects;

        } else {

          ssrPass.groundReflector = null,
          ssrPass.selects = null;

        }

      } );
      // ssrPass.thickness = 0.018;
      gui.add( ssrPass, 'thickness' ).min( 0 ).max( .1 ).step( .0001 );
      // ssrPass.infiniteThick = false;
      gui.add( ssrPass, 'infiniteThick' );           

      const folder = gui.addFolder( 'more settings' );
      folder.add( ssrPass, 'fresnel' ).onChange( ()=>{

        groundReflector.fresnel = ssrPass.fresnel;

      } );
      folder.add( ssrPass, 'distanceAttenuation' ).onChange( ()=>{

        groundReflector.distanceAttenuation = ssrPass.distanceAttenuation;

      } );
      // ssrPass.maxDistance = .1;
      // groundReflector.maxDistance = ssrPass.maxDistance;
      folder.add( ssrPass, 'maxDistance' ).min( 0 ).max( .5 ).step( .001 ).onChange( ()=>{

        groundReflector.maxDistance = ssrPass.maxDistance;

      } );           
      folder.add( ssrPass, 'bouncing' );
      folder.add( ssrPass, 'output', {
        'Default': SSRPass.OUTPUT.Default,
        'SSR Only': SSRPass.OUTPUT.SSR,
        'Beauty': SSRPass.OUTPUT.Beauty,
        'Depth': SSRPass.OUTPUT.Depth,
        'Normal': SSRPass.OUTPUT.Normal,
        'Metalness': SSRPass.OUTPUT.Metalness,
      } ).onChange( function ( value ) {

        ssrPass.output = parseInt( value );

      } );
      // ssrPass.opacity = 0.5;
      // groundReflector.opacity = ssrPass.opacity;
      folder.add( ssrPass, 'opacity' ).min( 0 ).max( 1 ).onChange( ()=>{

        groundReflector.opacity = ssrPass.opacity;

      } );
      folder.add( ssrPass, 'blur' );
      // folder.open()
      // gui.close()
       composer.addPass( ssrPass );
      scene.add( groundReflector );

      millis = Date.now() - start;        
      console.log('SSR loading End time = ', millis ,'ms');
  
    }
    // SSR_fun()
      ssr_ui.addEventListener("click",function(e){        
        if(e.target.checked){
          SSR_fun()
        }else{
          composer.removePass( ssrPass );
         if(gui) gui.hide();
        }
      })
      gui_ui.addEventListener("click",function(e){        
        if(e.target.checked){
          if(gui) gui.show();
        }else{           
         if(gui) gui.hide();
        }
      })
      
     //GammaCorrectionShader for the Colour fixing
    const copyPass2 = new ShaderPass(GammaCorrectionShader);    
    composer.addPass(copyPass2); 
    
    outlinePass = new OutlinePass(
      new Vector3(UIContainer.innerWidth, UIContainer.innerHeight),
      scene,
      camera
    );

    composer.addPass(outlinePass);                   

  }
  createTransfromCtrls() {
    exportScene(scene);
    reflection(scene,clock,gui);        
    viewPoints(camera);     
    // lightControls(scene,renderer,sunLight,ambientLightSun,clock,prompt,stateList,gui,fanLight,tableLamp,tableLampTop,texLoader,subTexture,cylindricalLampSpotLight_1,cylindricalLampSpotLight_2,cylindricalLampSpotLight_3,cylindricalLampSpotLight_4,start);      

  

    let selectToolBtn = document.getElementById("selectTool");
    selectToolBtn.addEventListener("change", selectToolToggle);

    let measurementsToolBtn = document.getElementById("measurementsTool");
    measurementsToolBtn.addEventListener("change", (event) => {
      // console.log(event.target.checked);
      if (event.target.checked) {
        selectToolBtn.checked = false;
        selectToolBtn.dispatchEvent(new Event("change"));
      }
    });

    let transformButtons = document.querySelectorAll(
      "input[name=transformTools]"
    );

    let transforms=document.querySelectorAll(".transforms");
    transformControl = new TransformControls(camera, renderer.domElement);

    function selectToolToggle(event) {
      raycaster.layers.set( 0 );
      if (mobile) {
        if (event.target.checked) {
          renderer.domElement.addEventListener("click", onPointerMove);
          transforms[0].style.backgroundColor="#FF5A50";
          transforms[0].style.color="#FFFFFF";

          transforms[1].style.backgroundColor="#FFFFFF";
          transforms[1].style.color="#000000";         
        } else { 
          renderer.domElement.removeEventListener("click", onPointerMove);
          outlinePass.selectedObjects = [];
          selectedObjects = [];

          transforms[0].style.backgroundColor="#FFFFFF";
          transforms[0].style.color="#000000"
          transformControl.detach();
        }
      } else {
        if (event.target.checked) {
          renderer.domElement.addEventListener("pointerdown", selectEvent);          
          transforms[0].style.backgroundColor="#FF5A50";
          transforms[0].style.color="#FFFFFF";

          transforms[1].style.backgroundColor="#FFFFFF";
          transforms[1].style.color="#000000"
        } else {
          renderer.domElement.removeEventListener("pointerdown", selectEvent);
          outlinePass.selectedObjects = [];
          selectedObjects = [];
          transforms[0].style.backgroundColor="#FFFFFF";
          transforms[0].style.color="#000000";
          transformControl.detach();
        }
      }
    }

    function selectEvent(event) {
      raycaster.layers.set(0);
      let drag = false;
      renderer.domElement.addEventListener("pointermove", () => (drag = true));
      renderer.domElement.addEventListener("pointerup", startSelecting);
      function startSelecting() {        
        if (!drag) {          
          onPointerMove(event);
        }
        drag = false;
      }
    }

    function onPointerMove(event) {
      mouse.x = (event.clientX / UIContainer.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / UIContainer.clientHeight) * 2 + 1;
      checkIntersection();
    }

    function addSelectedObject(object) {
      selectedObjects = [];
      selectedObjects.push(object);
    }

    function checkIntersection() {
      renderer.setRenderTarget( null );
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(selectableObjects, true);
      if (intersects.length > 0) {        
        let i = intersects[0].object;
        while (i.name !== "selectable") {
          i = i.parent;
          if (i.name === "selectable") {            
            addSelectedObject(i);            
            outlinePass.selectedObjects = selectedObjects;            
            outlinePass.edgeStrength = Number(10);
            outlinePass.edgeThickness = Number(0.1);    
            outlinePass.visibleEdgeColor.set('#161ef8');
            outlinePass.hiddenEdgeColor.set( '#161ef8' );
                                       
             if (transformControl.enabled) {
              transformControl.attach(i);               
              box.setFromObject(i);
              let boxCenter = new Vector3();
              box.getCenter(boxCenter);
              transformControl.position.copy(boxCenter);               
            } 

          }
        }
      }
    }

   
    transformControl.enabled = false;
    setTransformControlLayer(2);

    function setTransformControlLayer(layer) {
      transformControl.traverse((object) => object.layers.set(layer));
      transformControl.getRaycaster().layers.set(layer);
    }

    //Translate rotate buttons
    transformButtons.forEach((elem) => {
      elem.addEventListener("click", allowUncheck);
    });

    function allowUncheck(e) {
      transformControl.setMode(e.target.value);      
      raycaster.layers.set( 0 );

      transformControl.enabled = true;
      scene.add(transformControl);
      
      if (selectedObjects.length != 0) {
        transformControl.attach(selectedObjects[0]);            
         box.setFromObject(selectedObjects[0]);        
        let boxCenter = new Vector3();
        box.getCenter(boxCenter);
        transformControl.position.copy(boxCenter);             
      }
      if (this.previous) {
        this.checked = false;
        scene.remove(transformControl);
        transformControl.enabled = false;
      }
      document
        .querySelectorAll(`input[type=radio][name=${this.name}]`)
        .forEach((elem) => {
          elem.previous = elem.checked;
        });        
       
        const translate_fn = async () => {
          await new Promise(resolve => setTimeout(() => {
            transformControl.showY=true;  
            transformControl.showX=true;
            transformControl.showZ=true;            
            transforms[3].style.backgroundColor="#FF5A50";
            transforms[3].style.color="#FFFFFF";   
            resolve();
          }, 10));
        }; 
         async function translate_Fun() {                                      
          const spinnedFn = useSpinner(translate_fn, {
           container: container_3d
         });      
         // execute with a loading spinner
         await spinnedFn();
       }     
        const translate_Else_fn = async () => {
          await new Promise(resolve => setTimeout(() => {
            transforms[3].style.backgroundColor="#FFFFFF";
            transforms[3].style.color="#000000"; 
            resolve();
          }, 10));
        }; 
         async function translate_Else_Fun() {                                      
          const spinnedFn = useSpinner(translate_Else_fn, {
           container: container_3d
         });      
         // execute with a loading spinner
         await spinnedFn();
       }             
        const rotate_fn = async () => {
          await new Promise(resolve => setTimeout(() => {
            transformControl.showX=false;
            transformControl.showY=true;
            transformControl.showZ=false; 
            transforms[4].style.backgroundColor="#FF5A50";
            transforms[4].style.color="#FFFFFF";             
            resolve();
          }, 10));
        }; 
         async function rotate_Fun() {                                      
          const spinnedFn = useSpinner(rotate_fn, {
           container: container_3d
         });      
         // execute with a loading spinner
         await spinnedFn();
       }               
        const rotate_Else_fn = async () => {
          await new Promise(resolve => setTimeout(() => {
            transforms[4].style.backgroundColor="#FFFFFF";
            transforms[4].style.color="#000000";
            resolve();
          }, 10));
        }; 
         async function rotate_Else_Fun() {                                      
          const spinnedFn = useSpinner(rotate_Else_fn, {
           container: container_3d
         });      
         // execute with a loading spinner
         await spinnedFn();
       }                
        const scale_fn = async () => {
          await new Promise(resolve => setTimeout(() => {
            transformControl.showX=true;
          transformControl.showZ=true; 
          transformControl.showY=true; 
          transforms[5].style.backgroundColor="#FF5A50";
          transforms[5].style.color="#FFFFFF";  
            resolve();
          }, 10));
        }; 
         async function scale_Fun() {                                      
          const spinnedFn = useSpinner(scale_fn, {
           container: container_3d
         });      
         // execute with a loading spinner
         await spinnedFn();
       }              
        const scale_Else_fn = async () => {
          await new Promise(resolve => setTimeout(() => {
            transforms[5].style.backgroundColor="#FFFFFF";
            transforms[5].style.color="#000000"  
            resolve();
          }, 10));
        }; 
         async function scale_Else_Fun() {                                      
          const spinnedFn = useSpinner(scale_Else_fn, {
           container: container_3d
         });      
         // execute with a loading spinner
         await spinnedFn();
       }    
      
      
        if(e.target.value=="translate"){      
          translate_Fun()                
        }else{
          translate_Else_Fun()    
        }
        if(e.target.value=="rotate"){          
          rotate_Fun()       
        }else{
          rotate_Else_Fun()    
        }
        if(e.target.value=="scale"){
          scale_Fun()     
        }else{
          scale_Else_Fun()      
        }

      }
      const Unselect_fn = async () => {
        await new Promise(resolve => setTimeout(() => {
          raycaster.layers.set( 1 );
          outlinePass.selectedObjects = selectedObjects;
          outlinePass.edgeStrength = 0;
          outlinePass.edgeThickness=0;
          outlinePass.edgeGlow=0;            
    
          transformControl.reset();
          transformControl.detach();
          selectedObjects=[];

          for(let i=0;i<4;i++){
            if(i!=1){
            transforms[i].style.backgroundColor="#FFFFFF";
            transforms[i].style.color="#000000"
            }else{
              transforms[1].style.backgroundColor="#FF5A50";
              transforms[1].style.color="#FFFFFF";  
            }
          }
          resolve();
        }, 10));
      }; 
       async function Unselect_Fun() {                                      
        const spinnedFn = useSpinner(Unselect_fn, {
         container: container_3d
       });      
       // execute with a loading spinner
       await spinnedFn();
     }       
      let Unselect=document.getElementById("Unselect");      
      Unselect.addEventListener("change", (e) => {
        if (e.target.checked) {
          Unselect_Fun();
        }
      });

      const del_fn = async () => {
        await new Promise(resolve => setTimeout(() => {          
          if(selectedObjects[0]!=undefined){
          selectedObjects[0].traverse(function(node){
            if(node.isMesh){
              node.material.dispose();
              node.geometry.dispose();
              if(node.material.normalMap){
              node.material.normalMap.dispose();
              }           
            }
          })             
          scene.remove(selectedObjects[0]); 
          
        }else{
          console.log("select an object to delete")
        }                                                                                  
          transformControl.detach();            
          //console.log("memory ",renderer.info.memory)
  
          transforms[2].style.backgroundColor="#FF5A50";
          transforms[2].style.color="#FFFFFF"; 
        
          resolve();
        }, 10));
      }; 
       async function del_Fun() {                                      
        const spinnedFn = useSpinner(del_fn, {
         container: container_3d
       });      
       // execute with a loading spinner
       await spinnedFn();
     }    
     const del_Else_fn = async () => {
      await new Promise(resolve => setTimeout(() => {
        transforms[2].style.backgroundColor="#FFFFFF";
          transforms[2].style.color="#000000";
        resolve();
      }, 10));
    }; 
     async function del_Else_Fun() {                                      
      const spinnedFn = useSpinner(del_Else_fn, {
       container: container_3d
     });      
     // execute with a loading spinner
     await spinnedFn();
   }      
      let del=document.getElementById("DeleteT");
      del.addEventListener("change",(e)=>{            
        if(e.target.checked){                                
          del_Fun();
        }else{
          del_Else_Fun();
        }
      })
      let helper;
      const bounding_box_fn = async () => {
        await new Promise(resolve => setTimeout(() => {
              /* for(let i=0;i<=selectableObjects.length;i++){
            if(selectableObjects[i]!=null){
              helper = new THREE.BoxHelper(selectableObjects[i], 0xff0000);            
              scene.add(helper);                            	                    
            }          
          }     */  
          scene.traverse(function(node){
            if(node.isMesh){
              helper = new THREE.BoxHelper(node, 0xff0000);            
              scene.add(helper);  
            }
          })
          resolve();
        }, 10));
      }; 
      async function bounding_box_Fun() {                                      
        const spinnedFn = useSpinner(bounding_box_fn, {
         container: container_3d
       });      
       // execute with a loading spinner
       await spinnedFn();
     }       
      const bounding_box_Else_fn = async () => {
        await new Promise(resolve => setTimeout(() => {
          scene.traverse(function(node){            
            if(node.type=="BoxHelper"){               
              node.visible=false;
            }
          })
          resolve();
        }, 10));
      }; 
      async function bounding_box_Else_Fun() {                                      
        const spinnedFn = useSpinner(bounding_box_Else_fn, {
         container: container_3d
       });      
       // execute with a loading spinner
       await spinnedFn();
     }          
      let bounding_box=document.getElementById("bounding_box");
      bounding_box.addEventListener("change",(e)=>{            
        if(e.target.checked){                                
          bounding_box_Fun();
        }else{          
          bounding_box_Else_Fun();                  
        }
      })      
    transformControl.addEventListener("dragging-changed", function (event) {
      cameraControls.enabled = !event.value;
    });
  }
  createMeasurements() {
    let measurementsToolBtn = document.getElementById("measurementsTool");
    measurementsToolBtn.addEventListener("change", selectToolToggleM);

    let measurements=document.querySelector(".Measurements");
    function selectToolToggleM(event) {
      if (mobile) {
        if (event.target.checked) {
          renderer.domElement.addEventListener("click", onPointerMove);
          camera.layers.enable(1);
          measurements.style.backgroundColor="#FF5A50";
          measurements.style.color="#FFFFFF";
          container.appendChild(labelRenderer.domElement);          
          if(measurementLabels.length!=0){
            scene.add(measurementLabels[lineId])
          }
        } else {
          renderer.domElement.removeEventListener("click", onPointerMove);
          camera.layers.disable(1);
          measurements.style.backgroundColor="#FFFFFF";
          measurements.style.color="#000000";                   
          container.removeChild(labelRenderer.domElement);          
          scene.remove(measurementLabels[lineId]); 
        }
      } else {
        if (event.target.checked) {
          renderer.domElement.addEventListener("pointerdown", selectEvent);
          camera.layers.enable(1);
          measurements.style.backgroundColor="#FF5A50";
          measurements.style.color="#FFFFFF";
          
          container.appendChild(labelRenderer.domElement); 
          if(measurementLabels.length!=0){
            scene.add(measurementLabels[lineId])
          }
        } else {
          renderer.domElement.removeEventListener("pointerdown", selectEvent);
          camera.layers.disable(1);
          measurements.style.backgroundColor="#FFFFFF";
          measurements.style.color="#000000";           
          container.removeChild(labelRenderer.domElement);          
          scene.remove(measurementLabels[lineId]); 
        }
      }
    }

    function selectEvent(event) {
      let drag = false;
      renderer.domElement.addEventListener("pointermove", () => (drag = true));
      renderer.domElement.addEventListener("pointerup", startSelecting);
      function startSelecting() {
        // console.log(drag ? "drag" : "click");
        if (!drag) {
          onPointerMove(event);
          drag = false;
        }
      }
    }

    function onPointerMove(event) {
      mouse.x = (event.clientX / UIContainer.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / UIContainer.clientHeight) * 2 + 1;
      checkIntersection();
    }

    let matLine = new LineMaterial({
      color: 0x000000,
      linewidth: 0.005, // in world units with size attenuation, pixels otherwise
      //resolution:  // to be set by renderer, eventually
      dashed: false,
      // alphaToCoverage: false,
    });

    let points = [],geo2,lin2,pointsArray = [];

    let sphereGeo = new SphereGeometry(0.05, 16, 16);
    let sphereMat = new MeshStandardMaterial({
      color: 0x000000,
      emissive: 0x000000,
    });

    let sphereMesh = new Mesh(sphereGeo, sphereMat);
    let sphereMeshClone;    

    function checkIntersection() {
      raycaster.setFromCamera(mouse, camera);
      raycaster.params.Line.threshold = 0;
      raycaster.layers.set(0);
      const intersects = raycaster.intersectObject(scene, true);
      if (intersects.length > 0) {
        points.push(intersects[0].point);
        sphereMeshClone = sphereMesh.clone();       
        sphereMeshClone.layers.set(1);

        sphereMeshClone.position.copy(intersects[0].point);
        scene.add(sphereMeshClone);        

        if (points.length == 2) {
          pointsArray.push(points[0].x);
          pointsArray.push(points[0].y);
          pointsArray.push(points[0].z);
          pointsArray.push(points[1].x);
          pointsArray.push(points[1].y);
          pointsArray.push(points[1].z);

          geo2 = new LineGeometry().setPositions(pointsArray);
          lin2 = new Line2(geo2, matLine);
          lin2.layers.set(1);
          scene.add(lin2);
          
          measurementDiv = document.createElement('div')          
          const measurementLabel = new CSS2DObject(measurementDiv)        
          measurementLabels[lineId] = measurementLabel;
          scene.add(measurementLabels[lineId])

          const v0 =new Vector3(pointsArray[0], pointsArray[1], pointsArray[2]);
          const v1 = new Vector3( pointsArray[3], pointsArray[4], pointsArray[5] );
         
          const distance = v0.distanceTo(v1)          
          measurementLabels[lineId].element.innerText = distance.toFixed(2) + 'm'; 
          measurementLabels[lineId].position.lerpVectors(v0, v1,0.5);            
             

          points = [];
          pointsArray = [];          
        }
      }
    }
   
   
  }  

  start() {
    renderer.setAnimationLoop(function () {      

      cameraControls.update();
       renderer.info.reset();
       composer.render();
       
      //renderer.render(scene, camera);
      camera.updateMatrixWorld()       
      const delta = clock.getDelta();  
      if(chairModels.currentAnimationMixer){
        chairModels.currentAnimationMixer.update(delta);       
      }           
      if(tableModels.currentAnimationMixer){       
        tableModels.currentAnimationMixer.update(delta);        
      }  
      if(blindsModels.currentAnimationMixer){               
        blindsModels.currentAnimationMixer.update(delta);
      }     
      // console.log(renderer.info.memory);
      labelRenderer.render(scene, camera)          
      //DEBUG      
      debug.update(renderer);
      TWEEN.update()                     
    });  
       
    //Spinner Remove after starting to render the scene
    let loadingSpinner = document.getElementById("loadingSpinner");   
    loadingSpinner.remove();                 
    renderer.render(scene, camera);
    //DEBUG
    debug.displayStats();         
  }
  
}

export { World };
