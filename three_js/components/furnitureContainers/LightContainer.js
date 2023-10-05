import { lightTypesUI } from "../../systems/UI-Generators/lightTypesUI.js";
import { gltfLoad } from "../gltf_loader/gltfLoad.js";
import { AnimationMixer,
  Group,
 } from "three";
let lamp_val=0
class LightContainer {
  constructor(assetsList, lightsTypesUI, category, initialModelID,selectableObjects,scene,renderer) {
    this.assetsList = assetsList;
    this.parentGroup = new Group();
    this.parentGroup.name = "selectable";
    this.parentGroup1 = new Group();
    this.parentGroup1.name = "selectable";
    this.parentGroup2 = new Group();
    this.parentGroup2.name = "selectable";
    this.models = [];
    this.lightsTypesUI = lightsTypesUI;
    this.model;
    this.category = category;
    this.initialModelID = initialModelID;
    this.selectableObjects=selectableObjects;    
    this.scene=scene;   
    this.renderer=renderer;
  }

  async loadModel(URL, i, spinner) {
   // this.toastbody.replaceChildren();
    //Load a Default Model with "initialModelID"    
    URL ||= this.assetsList[this.initialModelID].URL;    
    
    i ||= this.initialModelID;

    if (this.models[i] === undefined) {
      //Spinner Display block before loading

      this.spinnerDisplay(spinner, "block");

      let modelURL = await fetch(URL); 
      const { gltfData } = await gltfLoad(modelURL.url);    
      
      let loadedModel = gltfData.scene;                 
      this.models[i] = loadedModel;
      
      this.spinnerDisplay(spinner, "none");
    }
    let model1_wall;       
    this.model = this.models[i];
    
    let FloorLamp=document.getElementById("FloorLamp");
    let WallLamp=document.getElementById("WallLamp");      
    if(this.models[i].children[0].name.slice(0,5)=="Lamp0"){      
      if(lamp_val>0){         
      this.parentGroup1.add(this.model);  
      this.scene.add(this.parentGroup1)   
      this.models[i].children[0].position.set(0.04,0.03,-0.1);      
      this.selectableObjects.push(this.parentGroup1)       
    }
    lamp_val=lamp_val+1                 
    }  
    if(this.models[i].children[0].name.slice(0,5)=="Lamp1"){
      FloorLamp.style.display="block";  
      this.models[i].children[0].position.set(-1.5, 0.017, -1.111) 
      this.models[i].children[0].rotation.set(0,-1.5,0)
      this.parentGroup.add(this.model);                  
    }
    if(this.models[i].children[0].name.slice(0,5)=="Lamp2"){ 
      WallLamp.style.display="block";                                  
      model1_wall= this.models[i].clone();      
      this.model.position.set(0.6, 0, 2.5)
      model1_wall.position.set(0.6, 0, 0.2) 
      model1_wall.rotation.set(0,-1.5,0)
      this.model.rotation.set(0,-1.5,0)          
      this.parentGroup2.add(model1_wall); 
      this.parentGroup2.add(this.model);               
    }                                    
    
  }

  spinnerDisplay(spinnerElement, displayStatus) {
    if (spinnerElement) {
      spinnerElement.style.display = displayStatus;
    } else {
      let element = document.getElementById(
        `spinner${this.assetsList[this.initialModelID].Name}`
      );
      if (element) {
        element.style.display = displayStatus;
      }
    }
  }

  createUI() {
    //Creates FurnitureTypes UI
    lightTypesUI(
      this.assetsList,
      this.lightsTypesUI,
      this.category,
      this.loadModel.bind(this),
      this.initialModelID,
      this.selectableObjects,      
      this.scene
    );
  }
}

export { LightContainer };
