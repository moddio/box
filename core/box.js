import { Engine as boxEngine } from "./engine";
import { Player as importedPlayer } from "./player";
import { Unit as importedUnit } from "./unit";
import { Projectile as importProjectile } from "./projectile";

export var isClient = window ? true : false;
export var isServer = !isClient;
export const Projectile = importProjectile;
export const Engine = new boxEngine();
export const Player = importedPlayer;
export const Unit = importedUnit;
export const inputs = require("game-inputs")();
