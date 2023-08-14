import { Clock, LoopOnce, Vector3,AmbientLight,Color,DirectionalLightHelper } from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import tablesHeights from "../../dataBase/tablesHeights.json" assert { type: "json" };
function animationUI(gltfData, mixer, category, URL,scene,renderer) {  

  let animationClips = [];

  let modelName = URL.slice(0, -4);
  modelName = modelName.substring(modelName.lastIndexOf("/") + 1);
  let indx=modelName.lastIndexOf("1")+1
  let model_name=modelName.slice(0,indx) 

  let form, input, label, img;
  let mainDiv = document.createElement("div");

  let div1 = document.createElement("div");
  div1.className = "d-flex gap-2";               
 //Animations UI
   if (category == "tables") {
    let tweens = [];   
    
    let tableTopPos = gltfData.scene.getObjectByName("Table_Top").position;          
    for (let i = 0; i < tablesHeights[model_name].length; i++) {
      //TweenSetup      
      let level = { y: tablesHeights[model_name][i] };      
      let tween = new TWEEN.Tween(tableTopPos).to(level, 1200);
      tween.easing(TWEEN.Easing.Sinusoidal.InOut);      
      tweens.push(tween);      
      //UI
      form = document.createElement("div");
      form.className = "form-check";      
      input = document.createElement("input");
      input.className = "form-check-input largerCheckbox labelAlignment ";
      input.type = "radio";
      input.name = model_name;
      input.id = tablesHeights[model_name][i];  
      
      if(i==0){
        input.checked=true;                
      }     
     
      label = document.createElement("label");
      label.className = "form-check-label";
      label.for = tablesHeights[model_name][i];
      label.innerHTML = "Level" + i;  

      input.addEventListener("click", function () {        
        tweens[i].start();              
      });
      
      form.appendChild(input);
      form.appendChild(label);
      div1.appendChild(form);
      mainDiv.appendChild(div1);

      
      
    }
     
  }else{   
    for (let i = 0; i < gltfData.animations.length; i++) {
      form = document.createElement("div");
      form.className = "form-check";

      input = document.createElement("input");
      input.className = "form-check-input largerCheckbox labelAlignment";
      
      input.type = "radio";
      input.name = "animations";
      input.id = gltfData.animations[0].name+i;

      label = document.createElement("label");
      label.className = "form-check-label";
      label.for = gltfData.animations[0].name+i;
      label.innerHTML = gltfData.animations[i].name;

      form.appendChild(input);
      form.appendChild(label);

      div1.appendChild(form);

      //Animation Clips
      animationClips[i] = mixer.clipAction(gltfData.animations[i]);
      animationClips[i].setLoop(LoopOnce);
      animationClips[i].blendMode = 1;
      animationClips[i].clampWhenFinished = true;                 
      
     /*  if(animationClips[i]._clip.name=="Half Open"){        
        animationClips[i].play();                
      }   */
      
      let lightPreset=document.querySelectorAll(".lightPreset");      
      lightPreset[0].addEventListener('change',function(){
      if (this.value == "DayLightPreset") {
        if(animationClips[i]._clip.name=="Half Open"){        
          animationClips[i].play();                
        }  
      } 
    })
    
      async function input_anim_Fun(){
        let myPromise = new Promise(function(resolve) {
          mixer.stopAllAction();
          animationClips[i].play();  
        });
        await myPromise;  
      } 

      let ambientLightIntensity = function(animName){
       
         if (lightPreset[0].value ==  "DayLightPreset") {          
          if (animName == "Blinds Close" || animName == "Roll Down" ) {
            let tween = new TWEEN.Tween(renderer).to({toneMappingExposure:0.01}, 2000);
            tween.start();            
          } else if( animName == "Half Open"){
            let tween = new TWEEN.Tween(renderer).to({toneMappingExposure:0.2}, 2000);
            tween.start();
          } else if( animName == "Blinds Open" ||  animName == "Roll Up"){
            let tween = new TWEEN.Tween(renderer).to({toneMappingExposure:0.1}, 2000);
            tween.start();}
        } 
       
        }

      input.addEventListener("click", function () {
        input_anim_Fun();   
        // ambientLightIntensity(gltfData.animations[i].name);         
      });
    }
    let animation_label = document.createElement("label");
    animation_label.innerText="Animations";
    animation_label.className="Animations"
    mainDiv.appendChild(animation_label);
    mainDiv.appendChild(div1);
  }

  //Material Variants UI
  let div2 = document.createElement("div");
  div2.className = "d-flex gap-2 justify-content-center";
  for (let i = 0; i < gltfData.userData.variants.length; i++) {
    input = document.createElement("input");
    input.type = "radio";
    input.value = gltfData.userData.variants[i];
    input.className = "btn-check";
    input.name = `${category}variants`;
    input.id = gltfData.userData.variants[i];
    input.autocomplete = "off";

    async function input_var_Fun(){
      let myPromise = new Promise(function(resolve) {
        gltfData.functions.selectVariant(gltfData.scene, event.target.value);      
      });
      await myPromise;  
    } 
    input.addEventListener("click", function (event) {
      input_var_Fun();
    });

    label = document.createElement("label");
    label.className = "btn px-0 py-0 position-relative border-2 mt-0";
    label.setAttribute("for", gltfData.userData.variants[i]);

    img = document.createElement("img");
    
    img.src =    
      "https://d1asmhoz5zfmcr.cloudfront.net/variantsThumbnails/" +
      model_name +
      "/" +
      gltfData.userData.variants[i] +
      ".webp";
    img.className = "img-thumbnail p-0 img-max-width-3";
    img.alt = "chair_1";    
    
    label.appendChild(img);
    div2.appendChild(input);
    div2.appendChild(label);
  }
  let variants_label = document.createElement("label");
  variants_label.innerText="Material Variants";
  variants_label.className="material_variants"
  mainDiv.appendChild(variants_label);
  mainDiv.appendChild(div2);

  return mainDiv;
}

export { animationUI };
