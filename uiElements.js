
let mobile = false;
if (/Android|iPhone/i.test(navigator.userAgent)) {
  mobile = true;
}
let desktopUI=document.getElementById("desktopUI");
let mobileUI=document.getElementById("mobileUI");

if(mobile){  
  desktopUI.style.display="none"
  mobileUI.style.display="block"
  
  let Section_Container=document.querySelectorAll(".Section_Container");

  let welcomSection=Section_Container[0]
  let furnitureSection=Section_Container[1]
  let lightingSection=Section_Container[2]
  let arrangementSection=Section_Container[3]
  let navigationSection=Section_Container[4]
  let advancedSection=Section_Container[5]
  let settingsSection=Section_Container[6]
  
  let prevNext=document.querySelectorAll(".prevNext");
  
  welcomSection.style.display="block";

  prevNext[0].onclick=function () {
    welcomSection.style.display="none"
    furnitureSection.style.display="block"
    lightingSection.style.display="none"
    arrangementSection.style.display="none"  
    navigationSection.style.display="none"
    advancedSection.style.display="none"
    settingsSection.style.display="none"
  }
  
  prevNext[1].onclick=function () {
      welcomSection.style.display="block"
      furnitureSection.style.display="none"
      lightingSection.style.display="none"
      arrangementSection.style.display="none"  
      navigationSection.style.display="none"
      advancedSection.style.display="none"
      settingsSection.style.display="none"
  }
  
  prevNext[2].onclick=function () {
      welcomSection.style.display="none"
      furnitureSection.style.display="none"
      lightingSection.style.display="block"
      arrangementSection.style.display="none"  
      navigationSection.style.display="none"
      advancedSection.style.display="none"
      settingsSection.style.display="none"
    }
  
    
    prevNext[3].onclick=function () {
      welcomSection.style.display="none"
      furnitureSection.style.display="block"
      lightingSection.style.display="none"
      arrangementSection.style.display="none"  
      navigationSection.style.display="none"
      advancedSection.style.display="none"
      settingsSection.style.display="none"
  }
  
  prevNext[4].onclick=function () {
      welcomSection.style.display="none"
      furnitureSection.style.display="none"
      lightingSection.style.display="none"
      arrangementSection.style.display="block"  
      navigationSection.style.display="none"
      advancedSection.style.display="none"
      settingsSection.style.display="none"
    }
    
    prevNext[5].onclick=function () {
      welcomSection.style.display="none"
      furnitureSection.style.display="none"
      lightingSection.style.display="block"
      arrangementSection.style.display="none"  
      navigationSection.style.display="none"
      advancedSection.style.display="none"
      settingsSection.style.display="none"
  }
  
  prevNext[6].onclick=function () {
      welcomSection.style.display="none"
      furnitureSection.style.display="none"
      lightingSection.style.display="none"
      arrangementSection.style.display="none"  
      navigationSection.style.display="block"
      advancedSection.style.display="none"
      settingsSection.style.display="none"
    }
  
    prevNext[7].onclick=function () {
      welcomSection.style.display="none"
      furnitureSection.style.display="none"
      lightingSection.style.display="none"
      arrangementSection.style.display="block"  
      navigationSection.style.display="none"
      advancedSection.style.display="none"
      settingsSection.style.display="none"
  }
  
  prevNext[8].onclick=function () {
      welcomSection.style.display="none"
      furnitureSection.style.display="none"
      lightingSection.style.display="none"
      arrangementSection.style.display="none"  
      navigationSection.style.display="none"
      advancedSection.style.display="block"
      settingsSection.style.display="none"
    }
    prevNext[9].onclick=function () {
      welcomSection.style.display="none"
      furnitureSection.style.display="none"
      lightingSection.style.display="none"
      arrangementSection.style.display="none"  
      navigationSection.style.display="block"
      advancedSection.style.display="none"
      settingsSection.style.display="none"
  }
  
  prevNext[10].onclick=function () {
      welcomSection.style.display="none"
      furnitureSection.style.display="none"
      lightingSection.style.display="none"
      arrangementSection.style.display="none"  
      navigationSection.style.display="none"
      advancedSection.style.display="none"
      settingsSection.style.display="block"
    }
    prevNext[11].onclick=function () {
      welcomSection.style.display="none"
      furnitureSection.style.display="none"
      lightingSection.style.display="none"
      arrangementSection.style.display="none"  
      navigationSection.style.display="none"
      advancedSection.style.display="block"
      settingsSection.style.display="none"
  }
  
  prevNext[12].onclick=function () {
      welcomSection.style.display="block"
      furnitureSection.style.display="none"
      lightingSection.style.display="none"
      arrangementSection.style.display="none"  
      navigationSection.style.display="none"
      advancedSection.style.display="none"
      settingsSection.style.display="none"
    }
  
  //navwelcomebtn
  let angle=document.querySelectorAll(".angle")
  let burgerMenuOptBtn=document.querySelectorAll(".burgerMenuOptBtn")
  
  burgerMenuOptBtn[0].onclick=function (){
    welcomSection.style.display="block"
    navigationSection.style.display="none"
    furnitureSection.style.display="none"
    lightingSection.style.display="none"
    advancedSection.style.display="none"
    settingsSection.style.display="none"
    arrangementSection.style.display="none"
    angle[0].style.color="red";
  }
  
  //navfurniturecomebtn
  burgerMenuOptBtn[1].onclick=function (){
    welcomSection.style.display="none"
    navigationSection.style.display="none"
    furnitureSection.style.display="block"
    lightingSection.style.display="none"
    advancedSection.style.display="none"
    settingsSection.style.display="none"
    arrangementSection.style.display="none"
    angle[1].style.color="red"
  }
  
  //navlightingcomebtn
  burgerMenuOptBtn[2].onclick=function (){
    welcomSection.style.display="none"
    navigationSection.style.display="none"
    furnitureSection.style.display="none"
    lightingSection.style.display="block"
    advancedSection.style.display="none"
    settingsSection.style.display="none"
    arrangementSection.style.display="none"
    angle[2].style.color="red"
  }
  
  //nav arrangementcomebtn
  burgerMenuOptBtn[3].onclick=function (){
    welcomSection.style.display="none"
    navigationSection.style.display="none"
    furnitureSection.style.display="none"
    lightingSection.style.display="none"
    advancedSection.style.display="none"
    settingsSection.style.display="none"
    arrangementSection.style.display="block"
    angle[3].style.color="red"
  }
  
  //nav navigationbtn
  burgerMenuOptBtn[4].onclick=function (){
    welcomSection.style.display="none"
    navigationSection.style.display="block"
    furnitureSection.style.display="none"
    lightingSection.style.display="none"
    advancedSection.style.display="none"
    settingsSection.style.display="none"
    arrangementSection.style.display="none"
    angle[4].style.color="red"
  }
  
  //navadvancedBtn
  burgerMenuOptBtn[5].onclick=function (){
    welcomSection.style.display="none"
    navigationSection.style.display="none"
    furnitureSection.style.display="none"
    lightingSection.style.display="none"
    advancedSection.style.display="block"
    settingsSection.style.display="none"
    arrangementSection.style.display="none"
    angle[5].style.color="red"
  }
  
  //navsettingBtn
  burgerMenuOptBtn[6].onclick=function (){
    welcomSection.style.display="none"
    navigationSection.style.display="none"
    furnitureSection.style.display="none"
    lightingSection.style.display="none"
    advancedSection.style.display="none"
    settingsSection.style.display="block"
    arrangementSection.style.display="none"
    angle[6].style.color="red"
  }
  
  
  //burger menu
  let burgermenuBtn=document.getElementById("burgerMenu");
  let navbarNavDropdown=document.getElementById("myModalnav");
  let closenavBtn=document.getElementById("closenav");
  burgermenuBtn.onclick=function(){
    if(burgermenuBtn.value==="off"){
    navbarNavDropdown.style.display="block"
    burgermenuBtn.value="on"
    }
    else{    
      navbarNavDropdown.style.display="none"
      burgermenuBtn.value="off"
    }
  }
  closenavBtn.onclick= function() {  
      navbarNavDropdown.style.display="none"
      burgermenuBtn.value="off"
  }
  
     //On Click Show the Toast
     const toastTypes = document.querySelectorAll(".toastTypes");
     let toast_button=document.querySelectorAll(".toast_button");
    
     toast_button[0].addEventListener("click", function () {    
      //toastTypes[1].classList.add("show");  
      toastTypes[0].classList.add("show");   
     });
    
     toast_button[1].addEventListener("click", function () {    
      toastTypes[1].classList.add("show"); 
      //toastTypes[0].classList.add("show");           
     });
     
     toast_button[2].addEventListener("click", function () {        
      toastTypes[2].classList.add("show");           
     });
  
     toast_button[3].addEventListener("click",function(){   
      toastTypes[3].classList.add("show");       
     })
     toast_button[4].addEventListener("click",function(){   
      toastTypes[4].classList.add("show");       
     })
     toast_button[5].addEventListener("click",function(){   
      toastTypes[5].classList.add("show");       
     })           
              
  
     let more=document.getElementById("more");   
     let backControls=document.getElementById("backControls");
     let MoreControlsToast=document.getElementById("MoreControlsToast");
  let toast_close_button=document.getElementById("toast_close_button")
  
     more.addEventListener("click",function(){
       MoreControlsToast.style.display="block";   
     })
     toast_close_button.addEventListener("click",function(){
      MoreControlsToast.style.display="none"; 
     })
  
     backControls.addEventListener("click",function(){
      MoreControlsToast.style.display="none"; 
     })  

     let home_card_close=document.getElementById("close_home");
      let home_card_container=document.getElementById("home_card_container1")
      let home_ui=document.getElementById("home_ui")
      home_card_close.addEventListener("click",function(){
      home_card_container.style.display="none"
      home_ui.style.display="block"    
      }) 
}
if(!mobile){
  mobileUI.style.display="none"
  desktopUI.style.display="block"

  let home_card_close_Desktop=document.getElementById("home_card_close_Desktop");
  let home_card_container_Desktop=document.getElementById("home_card_container_Desktop")
  let desktopUIContainer=document.getElementById("desktopUIContainer")
  home_card_close_Desktop.addEventListener("click",function(){
  home_card_container_Desktop.style.display="none"
  desktopUIContainer.style.display="block"    
}) 
}




