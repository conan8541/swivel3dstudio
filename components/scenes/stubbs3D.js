import { Scene, ArcRotateCamera, Vector3, DirectionalLight, MeshBuilder, StandardMaterial, Color3, Color4 } from '@babylonjs/core';

export function createScene(engine, canvas) {
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0, 0, 0, 1); // Black background

  const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 5, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const light = new DirectionalLight("light", new Vector3(-1, -2, -1), scene);
  light.intensity = 1;

  const cube = MeshBuilder.CreateBox("cube", { size: 2 }, scene);
  cube.material = new StandardMaterial("cubeMat", scene);
  cube.material.diffuseColor = new Color3(0, 0, 1); // Blue cube

  scene.registerBeforeRender(() => {
    cube.rotation.y += 0.02;
  });

  return scene;
}