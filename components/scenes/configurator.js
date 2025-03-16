import { Scene, ArcRotateCamera, Mesh, PBRMaterial, Vector3, DirectionalLight, SceneLoader, MeshBuilder, StandardMaterial, ShadowGenerator, Color3, Color4, Matrix } from '@babylonjs/core';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { ShadowOnlyMaterial } from "@babylonjs/materials";
import { gsap } from "gsap";

import "@babylonjs/loaders";
export function createScene(engine, canvas) {
  let camFactor = 14;
  const scene = new Scene(engine);
  scene.clearColor = new Color4( 0, 0, 0, 0); // Black background


  const camera = new ArcRotateCamera("Camera", 0, 0, 0, new Vector3(Math.PI / 5, 0, Math.PI / 0.2), scene);
camera.setPosition(new Vector3(-.15 * camFactor, 0.15 * camFactor, .08 * camFactor));
camera.setTarget(new Vector3(0.0, 0.65, 0.0));
camera.attachControl(canvas, true);
camera.minZ = 0.02;
camera.maxZ = 55;
camera.lowerRadiusLimit = 0.12 * camFactor; // Min distance
camera.upperRadiusLimit = 0.28 * camFactor;

const light = new DirectionalLight('light', new Vector3(-2, 6, 0), scene);
light.direction = new Vector3(-0.3, 0.6, -0.1); // Slight tilt toward z: 0

const shadowGenerator = new ShadowGenerator(2048, light);

shadowGenerator.useBlurExponentialShadowMap = true;
shadowGenerator.blurScale = 3;
shadowGenerator.setDarkness(0.91);

const ground = Mesh.CreatePlane('ground', 1000, scene);
const pbrgroundmat = new ShadowOnlyMaterial('shadowMat', scene);
pbrgroundmat.light = light;
ground.receiveShadows = true;
ground.position.y = 0; // Lowered
ground.rotation.x = Math.PI / 2;
ground.material = pbrgroundmat;



  const model = new URL("/public/models/IDF_Scout_HI_REZ_0004_.glb", import.meta.url).href;
//  ___________________________MATERIALS ________________________


const pbrsaddlemat = new PBRMaterial("saddlemat", scene);
const pbrPLACARD = new PBRMaterial("pbrSG", scene);
pbrsaddlemat.albedoColor = new Color3(0.4, 0.38, 0.15);
pbrsaddlemat.roughness = 0.9;
pbrsaddlemat.bumpTexture = new Texture("/public/maps/normal/NormalMapCotton.png", scene);
//pbrsaddlemat.albedoTexture = new Texture("/public/maps/diffuse/AirBrushFuselage.png", scene);
pbrsaddlemat.bumpTexture = new Texture("/public/maps/normal/NormalMap_fuse.png", scene);

const pbrDisc = new PBRMaterial("knob", scene);
pbrDisc.bumpTexture = new Texture("../public/maps/normal/knobNormal.png", scene);
const pbrLACE = new PBRMaterial("knob", scene);
pbrDisc.bumpLACE = new Texture("../public/maps/normal/knobNormal.png", scene);

const pbrPIPING = new PBRMaterial("SoftChrome", scene);
pbrPIPING.albedoColor = new Color3(0.5, 0.5, 0.5);
pbrPIPING.roughness = 0.2;

const pbrinSole = new PBRMaterial("Brass", scene);
pbrinSole.albedoColor = new Color3(0.9, 0.2, 0.2);
const pbrweltStitch = new PBRMaterial("Brass", scene);
pbrweltStitch.albedoColor = new Color3(0.9, 0.2, 0.2);


const pbrsteel = new PBRMaterial("Steel", scene);
pbrsteel.albedoColor = new Color3(0.5, 0.5, 0.5);
pbrsteel.roughness = 0.3;

const pbrToeCapMold = new PBRMaterial("Steel", scene);
pbrsteel.albedoColor = new Color3(0.5, 0.5, 0.5);
pbrsteel.roughness = 0.3;

const pbrLINER = new PBRMaterial("Collar", scene);
pbrLINER.metallic = 1.0;
pbrLINER.roughness = 0.1;
pbrLINER.albedoTexture = new Texture("/public/maps/diffuse/airbrushCollar.png", scene);
pbrLINER.specularTexture = new Texture("/public/maps/diffuse/airbrushCollar.png", scene);
pbrLINER.bumpTexture = new Texture("/public/maps/normal/collarNormal.png", scene);



//  ______________________END_MATERIALS ________________________

// *************************MODEL LOAD ***********************


async function loadModel() {
    try {
      console.log("Loading airbrush model...");
      const AirBrushModel = await SceneLoader.ImportMeshAsync("", model, "", scene);
      const { meshes } = AirBrushModel;

      if (!meshes || meshes.length === 0) {
        console.error("No meshes were loaded.");
        return;
      }

      const parentMesh = new Mesh("airbrushParent", scene);
      meshes.forEach(mesh => {
        if (!mesh || mesh.getTotalVertices() === 0) {
          console.warn(`Mesh ${mesh?.name || "Unnamed"} has no vertices.`);
        } else {
          mesh.setParent(parentMesh);
          mesh.castShadow = true;
          shadowGenerator.getShadowMap().renderList.push(mesh);
        }
      });

      meshes.forEach(part => {
        console.log(part.material?.name)
        switch (part.material?.name || "Unnamed Material") {
          case "saddlemat": part.material = pbrsaddlemat; break;
          case "PLACARD": part.material = pbrPLACARD; break;
          case "PIPING": part.material = pbrPIPING; break;
          case "Disc": part.material = pbrDisc; break;
          case "LACE": part.material = pbrLACE; break;
          case "inSole": part.material = pbrinSole; break;
          case "steel": part.material = pbrsteel; break;
          case "LINER": part.material = pbrLINER; break;
          case "ToeCapMold": part.material = pbrToeCapMold; break;
          case "weltStitch": part.material = pbrweltStitch; break;
          default: part.material = pbrsaddlemat;
        }
      });
      let shoeScale = 8
      parentMesh.scaling = new Vector3(shoeScale, shoeScale, shoeScale);
   //   camera.target = new Vector3(-2, 2, 0);
      parentMesh.position.y = 5;
      gsap.to(parentMesh.position, {
        y: 0.1,
        duration: 2.7,
        ease: "bounce.out",
        onUpdate: () => scene.render()
      });
    } catch (error) {
      console.error("Error loading model:", error);
    }
  }

  loadModel();
// ************************END*MODEL LOAD ***********************
  scene.createDefaultEnvironment({
    environmentTexture: "../public/env/blocky_photo_studio_8k.env",
    createGround: false,
    createSkybox: false
  });
  scene.environmentTexture.rotationY = Math.PI / 1.6; // 90 degrees

  scene.registerBeforeRender(() => {

  });

  return scene;
}