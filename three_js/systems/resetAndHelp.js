function resetAndHelp(camera){
    let reset=document.getElementById("Reload");
    async function reset_Fun(){
      let myPromise = new Promise(function(resolve) {
        window.location.reload(true);    
      });
      await myPromise;  
    }      
    reset.addEventListener("click",function(){
      reset_Fun()
    })
    async function ResetView_Fun(){
      let myPromise = new Promise(function(resolve) {        
        camera.position.set(0.01,1.5,4.7);                  
      });
      await myPromise;  
    }      
    let reset_Desktop=document.getElementById("reset_Desktop")
    reset_Desktop.onclick = function() {
      ResetView_Fun()
    }
    let ResetView=document.getElementById("reset");
    ResetView.onclick = function() {
      ResetView_Fun()
    }
    let reload_home=document.getElementById("reload_home");
    reload_home.addEventListener("click",function(){
      reset_Fun()
    })
    let reset_home=document.getElementById("reset_home");
    reset_home.addEventListener("click",function(){
      camera.position.set(0.01,2.165,4.73); 
      console.log("camera position set to default")
    })
    document.addEventListener("keydown", onDocumentKeyDown, false);
    async function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 27) {
      ResetView_Fun()
    } 
  }
    async function Help_Fun(){
      let myPromise = new Promise(function(resolve) {
        window.open("../../help.html");   
      });
      await myPromise;  
    }      

    let Help=document.getElementById("Help");
    Help.addEventListener("click",function(){
      Help_Fun()
    })
    let help3DButton=document.getElementById("help3DButton")
    help3DButton.addEventListener("click",function(){
      Help_Fun()
    })    
}
export {resetAndHelp};