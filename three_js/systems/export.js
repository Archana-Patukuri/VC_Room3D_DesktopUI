import axios from 'axios';
import { GLTFExporter } from '../../node_modules/three/examples/jsm/exporters/GLTFExporter.js';

function exportScene(scene) {
    const params = {
        trs: true,
        binary: true,
        maxTextureSize: 4096,
    };
    let renderUI=document.getElementById("renderUI")
    let renderUI_button=document.getElementById("renderUI_button")
    let closeRender=document.getElementById("closeRender");
    closeRender.addEventListener("click",function(){
        renderUI.style.display="none" 
    })
    renderUI_button.addEventListener("click",function(){
        renderUI.style.display="block" 
    })
    // Define the Flask server URL
    const flaskURL = 'http://viscommerce-cloud.com'; // Replace with your Flask server URL    

    let RenderButton=document.getElementById("RenderButton")
    // Click event listener for the export button
    const exportButton = document.getElementById("Export_Image");
    const exportButton1 = document.getElementById("Export_Video");
    RenderButton.addEventListener("click",function(){
        let email="sccene@gmail.com"
        exportSceneFn(scene, email); 
    })
    //Render Image
    exportButton.addEventListener("click", function () {
        const emailInput = document.getElementById("exampleInputEmail1");
        const email = emailInput.value.trim();

        if (email === "") {
            console.log("Email is required");
            return;
        }   
        
        // Export the scene with the provided email
        let val=exportSceneFun_Image(scene, email); 
        alert("Photo-realistic image rendered in VisCommerce 3DCloud will be delivered to your email-inbox  shortly")
         
         if(val){
            renderUI.style.display="none" 
         }
        // email=""     
        
    });
    //Render Video
    exportButton1.addEventListener("click", function () {
      const emailInput = document.getElementById("exampleInputEmail1");
      const email = emailInput.value.trim();

      if (email === "") {
          console.log("Email is required");
          return;
      }   
      
      // Export the scene with the provided email
      let val=exportSceneFun_Video(scene, email); 
      alert("Photo-realistic image rendered in VisCommerce 3DCloud will be delivered to your email-inbox  shortly")
       
       if(val){
          renderUI.style.display="none" 
       }
      // email=""     
      
  });
    function exportSceneFn(scene, email) {
        const exporter = new GLTFExporter();
    const options = {
      trs: params.trs,
      binary: params.binary,
      maxTextureSize: params.maxTextureSize,
    };
  
    // Remove the word after @ from the email address
    const emailWithoutDomain = email.split("@")[0];
  
    exporter.parse(
      scene,
      function (result) {
        if (result instanceof ArrayBuffer) {
          const fileName = `${emailWithoutDomain}.glb`; // Use email without domain as the file name
          saveArrayBuffer(result, fileName);
        } else {
          const output = JSON.stringify(result, null, 2);
          const fileName = `${emailWithoutDomain}.gltf`; // Use email without domain as the file name
          saveString(output, fileName);
        }
      },
      function (error) {
        console.log("An error happened");
      },
      options
    );
  
    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link);
  
    function save(blob, filename) {
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
  
    function saveString(text, filename) {
      save(new Blob([text], { type: "text/plain" }), filename);
    }
  
    function saveArrayBuffer(buffer, filename) {
      save(new Blob([buffer], { type: "application/octet-stream" }), filename);
    }
    }

    function exportSceneFun_Image(scene, email) {
        const exporter = new GLTFExporter();
        const options = {
            trs: params.trs,
            binary: params.binary,
            maxTextureSize: params.maxTextureSize,
        };

        exporter.parse(
            scene,
            function (result) {
                if (result instanceof ArrayBuffer) {
                    const fileName = `${email}.glb`; // Use email as the file name

                    // Convert the ArrayBuffer to a Blob
                    const glbBlob = new Blob([result], { type: 'model/gltf-binary' });

                    // Create a FormData object to send the file to the server
                    const formData = new FormData();
                    formData.append('email', email);
                    formData.append('glbData', glbBlob, fileName);

                    // Send the GLB data to the server using Axios
                    axios.post(`${flaskURL}/image_render`, formData)
                        .then(function (response) {
                            console.log(response.data);                            
                        })
                        .catch(function (error) {
                            console.log("An error happened while uploading GLB");
                            console.error(error);
                        });
                } else {
                    // Handle if the result is not an ArrayBuffer (JSON format)
                    console.log("JSON format not supported for upload");
                }
            },
            function (error) {
                console.log("An error happened during GLTF export");
            },
            options
        );         
       return 1 
    }
    function exportSceneFun_Video(scene, email) {
      const exporter = new GLTFExporter();
      const options = {
          trs: params.trs,
          binary: params.binary,
          maxTextureSize: params.maxTextureSize,
      };

      exporter.parse(
          scene,
          function (result) {
              if (result instanceof ArrayBuffer) {
                  const fileName = `${email}.glb`; // Use email as the file name

                  // Convert the ArrayBuffer to a Blob
                  const glbBlob = new Blob([result], { type: 'model/gltf-binary' });

                  // Create a FormData object to send the file to the server
                  const formData = new FormData();
                  formData.append('email', email);
                  formData.append('glbData', glbBlob, fileName);

                  // Send the GLB data to the server using Axios
                  axios.post(`${flaskURL}/video_render`, formData)
                      .then(function (response) {
                          console.log(response.data);                            
                      })
                      .catch(function (error) {
                          console.log("An error happened while uploading GLB");
                          console.error(error);
                      });
              } else {
                  // Handle if the result is not an ArrayBuffer (JSON format)
                  console.log("JSON format not supported for upload");
              }
          },
          function (error) {
              console.log("An error happened during GLTF export");
          },
          options
      );         
     return 1 
  }
}

export { exportScene };