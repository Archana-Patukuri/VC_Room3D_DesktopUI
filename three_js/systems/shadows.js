import NS1Assets from "../dataBase/NS1Assets.json" assert {type:"json"};
import intial_Shadow_Assets from "../dataBase/intial_shadows.json" assert {type:"json"};
let lightsArrIn,receiversArrIn,castersArrIn,lightsArrNS1, castersArrNSL1, receiversArrNSL1;                                  
        
lightsArrNS1=NS1Assets.lights
receiversArrNSL1=NS1Assets.receivers;
castersArrNSL1=NS1Assets.casters; 
lightsArrIn=intial_Shadow_Assets.lights
receiversArrIn=intial_Shadow_Assets.receivers;        
castersArrIn=intial_Shadow_Assets.casters;  

let nls1=lightsArrNS1.length, nls2=castersArrNSL1.length,nls3=receiversArrNSL1.length;
let Is3_1=lightsArrIn.length
let Is3=receiversArrIn.length;   
let Is3_2=castersArrIn.length;  
function shadows(scene,shadowLight) {              
       let n=[]
        scene.traverse(function (child) {              
          if (child.isMesh || child.isLight) {                        
            n.push(child)                          
          }   
        });             
        
        function Shadows_SunLightOn(){
          scene.traverse(function (child) {              
            if (child.isMesh) {
              child.castShadow = true; 
              child.receiveShadow = true;                               
            }                 
            if(child.type=="DirectionalLight"){
              child.castShadow = true; 
              // sunLight = scene.getObjectByName("Sun");    
              child.shadow.mapSize.width = 2048; 
              child.shadow.mapSize.height = 2048;
              child.shadow.camera.near = 0.1; 
              child.shadow.camera.far = 1000;
              child.shadow.autoUpdate = true;
              child.shadow.camera.updateProjectionMatrix();   
            }     
          });
        }
        //SUN LIGHT
      function Shadows_SunLightOf(){
        scene.traverse(function (child) {              
          if (child.isMesh) {
            child.castShadow = false; 
            child.receiveShadow = false;                               
          }   
          if(child.type=="DirectionalLight"){
            child.castShadow = false; 
          }      
        });    
      }              
       
    let Shadows_SunLight=document.getElementById("Shadows_SunLight");
    Shadows_SunLight.addEventListener("change",(e)=>{
        if(e.target.checked){               
          Shadows_SunLightOn();          
        }else{                         
          Shadows_SunLightOf();          
        }
      })

      //NIGHT LIGHT 1
      function Shadows_NightLight1On(){
/* scene.traverse(function (child) {              
            if (child.isMesh) {
              child.castShadow = false; 
              child.receiveShadow = false;                                   
            }      
          });    */                     
          for(let j=0;j<n.length;j++){  
            for(let i = 0; i < nls1; i++) {
              if(n[j].name==lightsArrNS1[i]){
                n[j].castShadow=true;              
              }
            }   
                                 
           for(let i = 0; i < nls2; i++) {
            if(n[j].name==castersArrNSL1[i]){
              n[j].castShadow=true;              
            }
          }
          for(let i = 0; i < nls3; i++) {
            if(n[j].name==receiversArrNSL1[i]){
              n[j].receiveShadow=true;                                  
            }    
          } 
        }                             
          
      }
      function Shadows_NightLight1Of(){
        for(let i = 0; i < nls3; i++) {
          for(let j=0;j<n.length;j++){            
            if(n[j].name==lightsArrNS1[i]){
              n[j].castShadow=false;                                          
            }         
          }                  
         } 
      }                    
function intial_shadowsOn(){   
  for(let j=0;j<n.length;j++){      
    for(let i = 0; i < Is3_1; i++) {
      if(n[j].name==lightsArrIn[i]){
        n[j].castShadow=true;                   
      }
    }                        
    for(let i = 0; i < Is3_2; i++) {
     if(n[j].name==castersArrIn[i]){
       n[j].castShadow=true;             
     }
   }
   for(let i = 0; i < Is3; i++) {
     if(n[j].name==receiversArrIn[i]){
       n[j].receiveShadow=true;                               
     } 
   } 
 }     
}
 let Shadows_NightLight1=document.getElementById("Shadows_NightLight1");
Shadows_NightLight1.addEventListener("change",(e)=>{
  if(e.target.checked){     
    Shadows_NightLight1On();    
  }else{                         
    Shadows_NightLight1Of();                      
  }
})    
    
 if(shadowLight==0){ 
  Shadows_SunLightOn();   
 }else if(shadowLight==1){
  Shadows_NightLight1On();  
 }else{
  
 }
}

export { shadows };