import { Engine } from "./engine";
import { config } from "../config/config";

export var isClient = window || false;
export var isServer = !isClient;

export const Engine = new Engine();

