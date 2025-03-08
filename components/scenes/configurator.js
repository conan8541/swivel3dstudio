import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';

export function initScene(canvas) {
  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);
  const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 5, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  const light = new DirectionalLight("light", new Vector3(-1, -2, -1), scene);
  light.intensity = 1;
  const cube = MeshBuilder.CreateBox("cube", { size: 2 }, scene);
  engine.runRenderLoop(() => scene.render());
}