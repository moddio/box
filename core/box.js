import { Engine as noaEngine } from "noa-engine";
import { Engine } from "./engine";
import { config } from "../config/config";
import { Mesh as noaMesh } from "@babylonjs/core/Meshes/mesh";

export const noa = new noaEngine(config);
export const Box = new Engine();
export const Mesh = noaMesh;
