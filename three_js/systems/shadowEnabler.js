function shadowEnabler(item) {
  item.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });  
}
 
export { shadowEnabler };
