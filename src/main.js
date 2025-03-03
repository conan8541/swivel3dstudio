import './style.css';
import { Engine } from "@babylonjs/core/Engines/engine";
import { Color3, Color4 } from '@babylonjs/core/Maths/math';
import { Scene } from "@babylonjs/core/scene";
import { SceneLoader } from '@babylonjs/core';
import { Vector3 } from "@babylonjs/core/Maths/math";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR";
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { ShadowOnlyMaterial } from "@babylonjs/materials";
import { gsap } from "gsap";
import { cardData } from '../components/data/cardData.js';
import createCards from "../components/webGlCards.js";
import { Mesh } from "@babylonjs/core/Meshes/mesh"; // <-- Added this import
import "@babylonjs/loaders";

const canvas = document.getElementById("renderCanvas");
const engine = new Engine(canvas, { alpha: true });
var scene = new Scene(engine);
scene.clearColor = new Color4(0.0, 0.0, 0.0, 0.0);

var camera = new ArcRotateCamera("Camera", 0, 0, 0, new Vector3(Math.PI / 5, 0, Math.PI / 2), scene);
camera.setPosition(new Vector3(-9, 2, -8));
camera.setTarget(new Vector3(-2, 0.8, 0.0));
camera.attachControl(canvas, true);
camera.minZ = 0.1;
camera.maxZ = 5000;
camera.lowerRadiusLimit = 4.5;
camera.upperRadiusLimit = 14;

const pbrChromeMaterial = new PBRMaterial("Chrome", scene);
let pbrfuselageMaterial = new PBRMaterial("pbrSG", scene);
pbrfuselageMaterial.metallic = 1.0;
pbrfuselageMaterial.roughness = 0.1;
pbrfuselageMaterial.albedoTexture = new Texture("../public/maps/diffuse/AirBrushFuselage.png", scene);
pbrfuselageMaterial.bumpTexture = new Texture("../public/maps/normal/NormalMap_fuse.png", scene);

const pbrKnobMaterial = new PBRMaterial("knob", scene);
pbrKnobMaterial.bumpTexture = new Texture("../public/maps/normal/knobNormal.png", scene);

const pbrSoftChromeMaterial = new PBRMaterial("SoftChrome", scene);
pbrSoftChromeMaterial.albedoColor = new Color3(0.5, 0.5, 0.5);
pbrSoftChromeMaterial.metallic = 0.5;
pbrSoftChromeMaterial.roughness = 0.2;

const pbrBrassMaterial = new PBRMaterial("Brass", scene);
pbrBrassMaterial.albedoColor = new Color3(0.9, 0.2, 0.2);
pbrBrassMaterial.specularColor = new Color3(0.9, 0.2, 0.2);
pbrBrassMaterial.metallic = 0.8;
pbrBrassMaterial.roughness = 0.3;

const pbrSteelMaterial = new PBRMaterial("Steel", scene);
pbrSteelMaterial.albedoColor = new Color3(0.5, 0.5, 0.5);
pbrSteelMaterial.metallic = 0.8;
pbrSteelMaterial.roughness = 0.3;

const pbrCollarMaterial = new PBRMaterial("Collar", scene);
//pbrCollarMaterial.albedoColor = new Color3(0.9, 0.2, 0.2);
//pbrCollarMaterial.specularColor = new Color3(0.9, 0.2, 0.2);
pbrCollarMaterial.metallic = 1.0;
pbrCollarMaterial.roughness = 0.1;
pbrCollarMaterial.albedoTexture = new Texture("../public/maps/diffuse/airbrushCollar.png", scene);
pbrCollarMaterial.specularTexture = new Texture("../public/maps/diffuse/airbrushCollar.png", scene);
pbrCollarMaterial.bumpTexture = new Texture("../public/maps/normal/collarNormal.png", scene);

var light = new DirectionalLight('light', new Vector3(-2, 5, -6), scene);
light.intensity = 0.0;

// Create a shadow catcher ground plane
var ground = Mesh.CreatePlane('ground', 1000, scene);
ground.rotation.x = Math.PI / 2;
ground.material = new ShadowOnlyMaterial('shadowOnly', scene);
ground.receiveShadows = true;
ground.position.y = -2.5;

var shadowGenerator = new ShadowGenerator(512, light);
shadowGenerator.useBlurExponentialShadowMap = true;
shadowGenerator.blurScale = 3;
shadowGenerator.setDarkness(0.91);

const model = new URL("../public/AIRBRUSHBlend.glb", import.meta.url).href;

let AirBrushModel = null;

const app = document.getElementById("app");

// Create and add the card to the page
createCards();





async function loadModel() {
  try {
    AirBrushModel = await SceneLoader.ImportMeshAsync("", model, "", scene);
    const { meshes } = AirBrushModel;

    if (!meshes || meshes.length === 0) {
      console.error("No meshes were loaded.");
      return;
    }

    // Create a parent mesh to group all parts
    const parentMesh = new Mesh("airbrushParent", scene);
    meshes.forEach(mesh => {
      if (!mesh || mesh.getTotalVertices() === 0) {
        console.warn(`Mesh ${mesh?.name || "Unnamed"} has no vertices.`);
      } else {
        console.log(`Mesh ${mesh.name} loaded successfully with ${mesh.getTotalVertices()} vertices.`);
        mesh.setParent(parentMesh); // Attach to parent
        shadowGenerator.getShadowMap().renderList.push(mesh);
      }
    });

    // Apply materials
    meshes.forEach(part => {
      switch (part.material?.name || "Unnamed Material") {
        case "knob":
          part.material = pbrKnobMaterial;
          break;
        case "sttel":
          part.material = pbrChromeMaterial;
          break;
        case "fuselage":
          part.material = pbrfuselageMaterial;
          break;
        case "collorLock":
          part.material = pbrCollarMaterial;
          break;
        case "brass":
          part.material = pbrBrassMaterial;
          break;
        case "softChrome":
          part.material = pbrSoftChromeMaterial;
          break;
        default:
          part.material = pbrChromeMaterial;
      }
    });

    // Set camera target to parent
    camera.target = new Vector3(0, 0, 0);

    // Animate the parent mesh
    parentMesh.position.y = 5; // Start above
    gsap.to(parentMesh.position, {
      y: 0.8,                  // Final spot
      duration: 1.5,
      ease: "bounce.out",
      onUpdate: () => scene.render() // Ensure shadows update
    });

  } catch (error) {
    console.error("Error loading model:", error);
  }
}









loadModel();




// Setup default environment for the scene
scene.createDefaultEnvironment({
  environmentTexture: "../public/env/blocky_photo_studio_8k.env",
  createGround: false,
  createSkybox: false
});

// Render loop
engine.runRenderLoop(() => {
  scene.render();
});

// Adjust engine size when the window is resized
window.addEventListener('resize', () => {
  engine.resize();
});



