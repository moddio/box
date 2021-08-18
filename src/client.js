import { clientNetworking } from "../core/components/network/clientNetworkEvent";

//console.log("hello", BOX.isClient);

BOX.Engine.start();
// remove inputs component for player and movement component
BOX.Engine.noa.entities.deleteComponent("receivesInputs");
BOX.Engine.noa.entities.deleteComponent("movement");

// USE THIS ON DEBUG MODE ONLY NOT IN PRODUCTION
global.BOX = BOX;

// start client networking
console.log("player has joined the game");
clientNetworking();

console.log("this the data of the player online", BOX.playerData);

// when player joins the game, create a unit, and assign that unit to that player.
// BOX.onEvent("playerJoin", function (player) {

// Adding ticks to player component

// creating tick inside entity of the player
