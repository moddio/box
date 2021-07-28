import { Engine as noaEngine } from "noa-engine";
import { Engine } from "./engine";
import { config } from "../config/config";

export const noa = new noaEngine(config);
export const engine = new Engine();
