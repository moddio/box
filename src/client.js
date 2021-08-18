import { clientNetworking } from "../core/components/network/clientNetworkEvent";

console.log("hello", box.isClient);

box.Engine.start();
// remove inputs component for player and movement component
box.Engine.noa.entities.deleteComponent("receivesInputs");
box.Engine.noa.entities.deleteComponent("movement");

// USE THIS ON DEBUG MODE ONLY NOT IN PRODUCTION
global.box = box;

// start client networking
console.log("player has joined the game");
clientNetworking();

console.log("this the data of the player online", box.playerData);

// when player joins the game, create a unit, and assign that unit to that player.
// box.onEvent("playerJoin", function (player) {

// Adding ticks to player component

// creating tick inside entity of the player
