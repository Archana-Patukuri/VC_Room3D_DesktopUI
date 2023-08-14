import hdriLoad from '../components/hdri_loader/hdri_loader';

const initialValue = {
  enabled: false,
  intensity: 0.5,
  color: '#ffffff',
  distance: 2,
};

const lightState = (settings) => {
  // console.log(settings);

  const { enabled, intensity, color, distance } = settings;
  // console.log(enabled, intensity, color, distance);
  // console.log(settings);
  return {
    enabled,
    intensity,
    color,
    distance,
  };
};

export default class LightStore {
  constructor(scene) {
    this.scene = scene;
    this.isDay = true;
    this.sunLight = lightState(initialValue);
    this.desktopLight = lightState(initialValue);
    this.ceilingLight = lightState(initialValue);
    this.wallWasherLight = lightState(initialValue);
    this.ambientLight = lightState(initialValue);
    this.pitchDark = false;
    this.shadows = false;
    this.sceneBackground = '#ffffff';
    this.hdri = hdriLoad().then((val) => val.hdri1);
    this.toneMappingValue = 0.5;

    this.scene.background = this.sceneBackground;
  }

  togglePresets() {
    this.sunLight = lightState(this.isDay, 0.2);
    this.desktopLight = lightState(true, this.isDay ? 0.2 : 0.8);

    this.isDay = !this.isDay;
  }

  updateSunlight(settings) {
    console.log(settings);
    this.sunLight = lightState({ ...this.sunLight, ...settings });
  }

  updateDesktopLight(settings) {
    console.log(settings);
    this.desktopLight = lightState({ ...this.sunLight, ...settings });
  }

  updateCielingLight(settings) {
    console.log(settings);
    this.ceilingLight = lightState({ ...this.sunLight, ...settings });
  }

  updateWallWasherLight(settings) {
    console.log(settings);
    this.wallWasherLight = lightState({ ...this.sunLight, ...settings });
  }

  updateToneMappingExposure(val) {
    this.toneMappingValue = val;
  }

  updateSceneBackground(val) {
    this.sceneBackground = val;
    this.scene.background = this.sceneBackground;
  }

  updateShadows(val) {
    this.shadows = val;
  }

  updatePitchDark(val) {
    this.pitchDark = val;
  }
}