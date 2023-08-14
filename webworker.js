onmessage = function(e) {
  // console.log('Worker: Message received from main script');
  const result = e.data     
    // console.log('Worker: Posting message back to main script');
    postMessage(result);  
}
/* const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/index.js");
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
}; */

//  registerServiceWorker();
/* let w;
function startWorker() {
    if (typeof(w) == "undefined") {
        
      w = new Worker("uiElements.js");      
    }
    w.onmessage = function(event) {
      console.log(event.data);  
      stopWorker()    
    };
  }
   startWorker()
   function stopWorker() {
    w.terminate();
    w = undefined;
  }     */