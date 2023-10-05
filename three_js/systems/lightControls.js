import  hdriLoad  from "../components/hdri_loader/hdri_loader.js";
import * as THREE from 'three';
import elementFromHtmlString from '../utils/elementFromHtmlString';
import { Color } from 'three';
async function lightControls(
  scene,
  renderer,
  prompt,
  sunLight,
  ambientLight,
  camera,
  clock,
  stateList,
  gui,
  lightState,
  ceilingLight,
  wallWasherLightArray
) {
  // const lightState = new LightStore();
  const { background0,hdri0,hdri1 } = await hdriLoad(); 

  const controlsArray = [
    'pitchDark',
    'ceilingLight',
    'DesktopLight',
    'sunLight',
    'ambientLight',
    'wallWasherLight',
    'hdri',
  ];

  const LightControlsArray = [
    {
      id: 'pitchDark',
      innerText: 'Pitch Dark',
      helper: null,
      distance: null,
      decay: null,
      color: null,
      intensity: null,
      light: null,
    },
    {
      id: 'ceilingLight',
      innerText: 'Cieling Light',
      helper: true,
      distance: 4,
      decay: 2,
      color: '#ffffff',
      intensity: 30,
      light: ceilingLight,
    },
    {
      id: 'desktopLight',
      innerText: 'Desktop Light',
      helper: true,
      distance: 4,
      decay: 2,
      color: '#ffffff',
      intensity: 15,
      light: scene.getObjectByName('Desktop_Lamp_Light002'),
    },
    {
      id: 'wallWasherLight',
      innerText: 'Wall Washer Light',
      helper: true,
      distance: 1,
      decay: 2,
      color: '#ffffff',
      intensity: 2,
      light: wallWasherLightArray,
    },
    {
      id: 'sunLight',
      innerText: 'Sun Light',
      helper: true,
      distance: null,
      decay: null,
      color: '#ffffff',
      intensity: 30,
      light: sunLight,
    },
    {
      id: 'ambientLight',
      innerText: 'Ambient Light',
      helper: null,
      distance: null,
      decay: null,
      color: '#ffffff',
      intensity: 1,
      light: ambientLight,
    },        
  ];

  const htmlArray1 = LightControlsArray.map((item) =>
   elementFromHtmlString(`
  <div calss="d-flex lightSettingContainer" style="display:flex; align-items:center; width:100%;gap:5px;margin-left:60px">
    <div class="d-flex flex-row" style="display:flex; align-items:center; width:100%;" >
      <label for="${
        item.id
      }" style="display:flex; align-items:center;width:150px" >
        <input type="radio" data-type="${
          item.id
        }" name="lights" class="lightActiveCheckbox" />
        ${item.innerText}
      </label>
    </div>
    ${
      item.intensity
        ? `
        <div classm="slidecontainer">
        <input type="range" data-type="${item.id}" min="0" max="10" value="${item.intensity}" step="0.1"
        class="slider Slider_range intensity_slider" style="width:60px"/>
        </div>
    `
        : ''
    }
    ${
      item.color
        ? `
    <div class="colorPickerContainer" >
      <input type="color" data-type="${item.id}" class="colorPicker" name="colorPicker"
      value="${item.color}" style="border:none;height: 20px;width:20px">
    </div>`
        : ''
    }
    ${
      item.helper
        ? `
    <input type="radio" data-type="${item.id}" value="${item.helper}" name="helper"
    class="helpers_controls">
    `
        : ''
    }
    ${
      item.distance
        ? `
    <input type="number" data-type="${item.id}" class="distance_class" name="distance_class" 
    value="${item.distance}" min="0" max="10" step="0.1"  style="width: 25px;height: 20px;">
    `
        : ''

    }
    ${
      item.decay
        ? `
    <input type="number" data-type="${item.id}" class="decay_class" name="decay_class" value="${item.decay}" min="0" max="10"
      step="0.1" style="width: 25px;height: 20px;">
      `
        : ''
    }      
  </div>
`
)
  
  );
  const htmlArray = LightControlsArray.map((item) =>
  elementFromHtmlString(`  
  <div calss="lightSettingContainer" style="width:100%;gap:5px;margin-left:5px">    
    <div class="d-flex flex-row" style="display:flex; align-items:center; width:100%;" >
      <label for="${
        item.id
      }" style="display:flex; align-items:center;width:150px" >
        <input type="radio" data-type="${
          item.id
        }" name="lights" class="lightActiveCheckbox" />
        ${item.innerText}
      </label>
    </div>
    <div class="d-flex flex-row" style="gap:5px">
    ${
      item.intensity
        ? `
        <div classm="slidecontainer">
        <input type="range" data-type="${item.id}" min="0" max="10" value="${item.intensity}" step="0.1"
        class="slider Slider_range intensity_slider" style="width:60px"/>
        </div>
    `
        : ''
    }
    ${
      item.color
        ? `
    <div class="colorPickerContainer" >
      <input type="color" data-type="${item.id}" class="colorPicker" name="colorPicker"
      value="${item.color}" style="border:none;height: 20px;width:20px">
    </div>`
        : ''
    }    
    </div>  
  </div>
`
)

);

  const controlsContianer = document.querySelector('.initialControlsContainer');   
  let l=(htmlArray.length)-1
  for(let i=0;i<l;i++){
    controlsContianer.appendChild(htmlArray[i]);
  }
  const controlsContianer1 = document.querySelector('.initialControlsContainer1');
  htmlArray1.forEach((item) => {    
    controlsContianer1.appendChild(item);
  });

  const checkboxArray = document.querySelectorAll('.lightActiveCheckbox');
  const intensitySliderArray = document.querySelectorAll('.intensity_slider');  
  let colorPickerArray=document.querySelectorAll(".colorPicker")
  let distanceArray=document.querySelectorAll(".distance_class")
  let decayArray=document.querySelectorAll(".decay_class")
  let helpersArray=document.querySelectorAll(".helpers_controls");

  let emissive_Obj=scene.getObjectByName("Mesh_Walls001"); 
  let Motor_emissive=scene.getObjectByName("Motor_emissive");          
  let emissive_Obj_fan=scene.getObjectByName("Motor");    

  checkboxArray.forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      if (e.target.dataset.type === 'pitchDark') {       
          renderer.toneMappingExposure = 0.2; 
          emissive_Obj.material.emissive=new Color(0, 0, 0);
          emissive_Obj_fan.material.emissive=new Color(0, 0, 0);              
          Motor_emissive.material.emissive=new Color(0, 0, 0);                
      }
      

      LightControlsArray.forEach((item) => {
          if (item.light) {
           if (item.light.length) {
             item.light.forEach((light) => {
               light.intensity = 0;
             });
           } else {
             item.light.intensity = 0;
           }         
         }          
       });
      
      const lightToChangeData = LightControlsArray.find(
        (i) => i.id === e.target.dataset.type
      );
       
      const lightToChange = lightToChangeData.light;
      if (lightToChangeData.intensity && lightToChange) {        
        if (lightToChange.length) {                   
          lightToChange.forEach((item) => {
            item.intensity = e.target.checked ? lightToChangeData.intensity : 0;            
          });
        } else {
          lightToChange.intensity = e.target.checked
            ? lightToChangeData.intensity
            : 0;                                       
        }  
        emissive_Obj.material.emissive=new Color(1, 1, 1);                    
      Motor_emissive.material.emissive=new Color(1, 1, 1);                  
        renderer.toneMappingExposure = 1;
      }     
      console.timeEnd('toggler Checkbox');
    });
  });
  intensitySliderArray.forEach((slider) => {
    slider.addEventListener('input', (e) => {      
      const lightToChangeData = LightControlsArray.find(
        (i) => i.id === e.target.dataset.type
      );
      const lightToChange = lightToChangeData.light;
      
      if (lightToChangeData.intensity && lightToChange) {
        if (lightToChange.length) {
          lightToChange.forEach((item) => {
            item.intensity =parseInt(e.target.value);            
          });
        } else {
          lightToChange.intensity = parseInt(e.target.value);                  
        }
      }
      
    });    
    
  });  
  colorPickerArray.forEach((colorPicker) => {
    colorPicker.addEventListener('input', (e) => {      
      const lightToChangeData = LightControlsArray.find(
        (i) => i.id === e.target.dataset.type
      );
      const lightToChange = lightToChangeData.light;      
      if (lightToChangeData.color && lightToChange) {
        if (lightToChange.length) {
          lightToChange.forEach((item) => {
            item.color = new Color(e.target.value);
          });
        } else {
          lightToChange.color = new Color(e.target.value);
        }
      }
    });
  });
  helpersArray.forEach((helpers_controls) => {
    helpers_controls.addEventListener('input', (e) => {      
      const lightToChangeData = LightControlsArray.find(
        (i) => i.id === e.target.dataset.type
      );
      const lightToChange = lightToChangeData.light;      
      if (lightToChangeData.helper && lightToChange) {        
        scene.traverse(function(child){
          if(child.name=="helper"){            
            scene.remove(child);
          }
        })
        if (lightToChange.length) {
          lightToChange.forEach((item) => {            
            const helper = new THREE.SpotLightHelper( item ); 
            helper.name="helper"
            scene.add( helper ); 
          });
        } else {          
          let helper;
          if(lightToChange.type=="SpotLight"){
           helper = new THREE.SpotLightHelper( lightToChange );  
           helper.name="helper"                    
          }else if(lightToChange.type=="PointLight"){
            helper= new THREE.PointLightHelper( lightToChange, 1 ); 
            helper.name="helper"
          }else{
            helper = new THREE.DirectionalLightHelper( lightToChange,1,0xFF0000 );
            helper.name="helper"
          }
          scene.add( helper );          
        }
      }
    });
  });
  distanceArray.forEach((distance_class) => {
    distance_class.addEventListener('input', (e) => {      
      const lightToChangeData = LightControlsArray.find(
        (i) => i.id === e.target.dataset.type
      );
      const lightToChange = lightToChangeData.light;      
      if (lightToChangeData.distance && lightToChange) {
        if (lightToChange.length) {
          lightToChange.forEach((item) => {
            item.distance = e.target.value;
          });
        } else {
          lightToChange.distance = e.target.value;
        }
      }
    });
  });
  decayArray.forEach((decay_class) => {
    decay_class.addEventListener('input', (e) => {      
      const lightToChangeData = LightControlsArray.find(
        (i) => i.id === e.target.dataset.type
      );
      const lightToChange = lightToChangeData.light;      
      if (lightToChangeData.decay && lightToChange) {
        if (lightToChange.length) {
          lightToChange.forEach((item) => {
            item.decay = e.target.value;
          });
        } else {
          lightToChange.decay = e.target.value;
        }
      }
    });
  });

  
  

  stateList.Emissive.addEventListener("change", (e) => {    
    if (e.target.checked) {            
       emissive_Obj.material.emissive=new Color(1, 1, 1);                    
        Motor_emissive.material.emissive=new Color(1, 1, 1);         
        emissive_Obj_fan.material.emissive=new Color(1, 1, 1);      
    }else{           
      emissive_Obj.material.emissive=new Color(0, 0, 0);
      emissive_Obj_fan.material.emissive=new Color(0, 0, 0);      
      Motor_emissive.material.emissive=new Color(0, 0, 0); 
           
    }
  }) 
  
  
  let floor_lamp=document.getElementById("floor_lamp");
  let wall_lamp=document.getElementById("wall_lamp"); 
let slidecontainer=document.querySelectorAll(".slider_class");
let colorPickerContainer=document.querySelectorAll(".colorPicker1")
let distance=document.querySelectorAll(".distance");
let decay=document.querySelectorAll(".decay")
let helper_FW=document.querySelectorAll(".helper_FW");

let slider_HL=slidecontainer[2]
let slider_FL=slidecontainer[0],colorPicker_FL=colorPickerContainer[0],distance_FL=distance[0],decay_FL=decay[0],helpers_FL=helper_FW[0]
let slider_WL=slidecontainer[1],colorPicker_WL=colorPickerContainer[1],distance_WL=distance[1],decay_WL=decay[1],helpers_WL=helper_FW[1]

stateList.HDRI.addEventListener("change",(e)=>{
  if(e.target.checked){
    scene.environment = hdri1;  
    slider_HL.oninput = function() {                
      renderer.toneMappingExposure=this.value
    }  
  }else{
    scene.environment = hdri0;  
  }
})   

  floor_lamp.addEventListener("change",(e)=>{
    if(e.target.checked){
      let floor_lamp_Ele=scene.getObjectByName("Point");      
      renderer.toneMappingExposure = 1;                  
                                       
      floor_lamp_Ele.intensity=5      
      floor_lamp_Ele.castShadow=true     

      slider_FL.oninput = function() {                
        floor_lamp_Ele.intensity=this.value
      }  
      colorPicker_FL.oninput = function() {                                             
        floor_lamp_Ele.color.setHex("0x"+this.value.slice(1,7), 1);          
      }   
      const pointLightHelper_FL = new THREE.PointLightHelper( floor_lamp_Ele, 1 ,0x000000 );
      helpers_FL.addEventListener("change",(e)=>{
        if(e.target.checked){        
          scene.add( pointLightHelper_FL );  
        }else{
          scene.remove( pointLightHelper_FL ); 
        }
      })
      distance_FL.oninput = function() {   
        floor_lamp_Ele.distance=this.value;                
      }   
      decay_FL.oninput=function(){
        floor_lamp_Ele.decay=this.value;
      }    
    
    }else{
      let floor_lamp_Ele=scene.getObjectByName("Point");     
      floor_lamp_Ele.intensity=0;      
      floor_lamp_Ele.castShadow=false            
    }
  })  
  let Point_Light,Point_Light1;
  wall_lamp.addEventListener("change",(e)=>{
    if(e.target.checked){
      renderer.toneMappingExposure = 1;                          

      let arr=[];
      scene.traverse(function (child) {            
        if (child.isLight && child.name=="Point_Light") {                                      
            arr.push(child);                                                           
       }    
       });            
       Point_Light=arr[0]       
       Point_Light1=arr[1]        
    
      Point_Light.intensity=2
      Point_Light1.intensity=2

      Point_Light.castShadow=true;
      Point_Light1.castShadow=true;        
      
      slider_WL.oninput = function() {          
        Point_Light.intensity=this.value
        Point_Light1.intensity=this.value
      }
      colorPicker_WL.oninput = function() {                                             
        Point_Light.color.setHex("0x"+this.value.slice(1,7), 1);          
        Point_Light1.color.setHex("0x"+this.value.slice(1,7), 1);          
      }  
      distance_WL.oninput = function() {   
        Point_Light.distance=this.value;                
        Point_Light1.distance=this.value;
      }   
      decay_WL.oninput=function(){
        Point_Light.decay=this.value;
        Point_Light1.decay=this.value;
      }    

      slider_WL.oninput = function() {          
        Point_Light.intensity=this.value
        Point_Light1.intensity=this.value
      }
      colorPicker_WL.oninput = function() {                                             
        Point_Light.color.setHex("0x"+this.value.slice(1,7), 1);          
        Point_Light1.color.setHex("0x"+this.value.slice(1,7), 1);          
      }  
      const pointLightHelper_WL = new THREE.PointLightHelper( Point_Light, 1 );
      const pointLightHelper_WL1 = new THREE.PointLightHelper( Point_Light1, 1 );
      helpers_WL.addEventListener("change",(e)=>{
        if(e.target.checked){        
          scene.add( pointLightHelper_WL );  
          scene.add( pointLightHelper_WL1 ); 
        }else{
          scene.remove( pointLightHelper_WL ); 
          scene.remove( pointLightHelper_WL1 ); 
        }
      }) 
                               
    }else{
      let arr=[]
      scene.traverse(function (child) {            
        if (child.isLight) {             
          if(child.name=="Point_Light"){              
            arr.push(child);
          }                                               
       }    
       });   
       Point_Light=arr[0]       
       Point_Light1=arr[1]
       Point_Light.castShadow=false;
       Point_Light1.castShadow=false;
      Point_Light.intensity=0;       
      Point_Light1.intensity=0;          
      let wallLamp_emissive=scene.getObjectByName("Mesh011_1");
      wallLamp_emissive.material.emissive=new Color(0,0,0);
                
    }
  })   

}
export { lightControls };