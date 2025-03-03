import './style.css'
import { Engine } from "@babylonjs/core/Engines/engine";
import { Color3, Color4 } from '@babylonjs/core/Maths/math';
import { Scene } from "@babylonjs/core/scene";
import { SceneLoader } from '@babylonjs/core';
import { Vector3 } from "@babylonjs/core/Maths/math";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { PBRSpecularGlossinessMaterial, PBRMaterial } from "@babylonjs/core/Materials/PBR";
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import "@babylonjs/loaders";
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Meshes/Builders/sphereBuilder";
import "@babylonjs/core/Meshes/Builders/boxBuilder";
import "@babylonjs/core/Meshes/Builders/groundBuilder";

const canvas = document.getElementById("renderCanvas");
const engine = new Engine(canvas, { alpha: true });
var scene = new Scene(engine);
console.log(scene)
scene.clearColor = new Color4(0.0, 0.0, 0.0, 0.0)
var camera = new ArcRotateCamera("Camera", 0, 0, 0, new Vector3( Math.PI / 5, 0,  Math.PI / 2), scene);
camera.setPosition(new Vector3(-8, 2, -8));
camera.setTarget(new Vector3(-2, 0.8, 0.0));
camera.attachControl(canvas, true);
camera.minZ = 0.1;  // Ensure near clipping plane is not too far
camera.maxZ = 5000;
camera.lowerRadiusLimit = 4.5;
camera.upperRadiusLimit = 14;
const pbrChromeMaterial = new PBRMaterial("Chrome", scene);

let pbrfuselageMaterial = new PBRMaterial("pbrSG", scene);
pbrfuselageMaterial.metallic = 1.0;  // Full metal effect
pbrfuselageMaterial.roughness = 0.1;
//pbrfuselageMaterial.diffuseTexture = new Texture("../public/maps/normal/AirBrushFuselage.png", scene);
pbrfuselageMaterial.albedoTexture = new Texture("../public/maps/diffuse/AirBrushFuselage.png", scene);
pbrfuselageMaterial.bumpTexture = new Texture("../public/maps/normal/NormalMap_fuse.png", scene);

const pbrKnobMaterial = new PBRSpecularGlossinessMaterial("knob", scene);
pbrKnobMaterial.normalTexture = new Texture("../public/maps/normal/knobNormal.png", scene)
//pbrKnobMaterial.albedoColor = new Color3(0.9, 0.2, 0.2)
//pbrKnobMaterial.specularColor = new Color3(0.9, 0.2, 0.2)

const pbrSoftChromeMaterial = new PBRMaterial("SoftChrome", scene);
pbrSoftChromeMaterial.albedoColor = new Color3(0.5, 0.5, 0.5)
pbrSoftChromeMaterial.metallic = 0.5;  // Full metal effect
pbrSoftChromeMaterial.roughness = 0.2;

const pbrBrassMaterial = new PBRMaterial("Brass", scene);
pbrBrassMaterial.albedoColor = new Color3(0.9, 0.2, 0.2)
pbrBrassMaterial.specularColor = new Color3(0.9, 0.2, 0.2)
pbrBrassMaterial.metallic = 0.8;  // Full metal effect
pbrBrassMaterial.roughness = 0.3;

const pbrSteelMaterial = new PBRMaterial("Steel", scene);
pbrSteelMaterial.albedoColor = new Color3(0.5, 0.5, 0.5)
pbrSteelMaterial.metallic = 0.8;  // Full metal effect
pbrSteelMaterial.roughness = 0.3;

const pbrCollarMaterial = new PBRMaterial("Collar", scene);
pbrCollarMaterial.albedoColor = new Color3(0.9, 0.2, 0.2)
pbrCollarMaterial.specularColor = new Color3(0.9, 0.2, 0.2)

const model = new URL("../public/AIRBRUSHBlend.glb", import.meta.url).href;
const AirBrushModel = await SceneLoader.ImportMeshAsync("", model, "", scene);
console.log(AirBrushModel.meshes[0].name)
console.log(AirBrushModel.meshes[2].material);
console.log(pbrfuselageMaterial);
//scene.autoClear = true
function adjustEngineSize() {
  engine.resize();
}
window.addEventListener('resize', adjustEngineSize);
AirBrushModel.meshes.forEach((part) => {
  //part.material = gridMaterial
  console.log(part.material?.name || "Unnamed Material")

  switch (part.material?.name || "Unnamed Material") {
    case "knob":
      console.log(part.material.name)
      part.material = pbrKnobMaterial
      break;
    case "sttel":
      console.log(part.material.name)
      part.material = pbrChromeMaterial
      break;
    case "fuselage":
      console.log(part.material.name)
      part.material = pbrfuselageMaterial
      
      break;
    case "collorLock":
      console.log(part.material.name)
      part.material = pbrCollarMaterial
      break;
    case "brass":
      console.log(part.material.name)
      part.material = pbrBrassMaterial
      break;
    case "softChrome":
      console.log(part.material.name)
      part.material = pbrSoftChromeMaterial
      break;
    default:
      part.material = pbrChromeMaterial
  }
});
scene.createDefaultEnvironment({
  environmentTexture: "../public/env/blocky_photo_studio_8k.env",
  createGround: false,
  createSkybox: false
});

engine.runRenderLoop(() => {
  scene.render();
});


