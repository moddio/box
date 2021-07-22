var isClient = true;


// 1. CLIENT: connect to server
// 2. SERVER: serverNetworkEvent will register "playerConnect" event. create a player in server (playerManager.createPlayer()), and send "createPlayer" event to the client
// 3. CLIENT: once connected wait for server to send "createPlayer" event
// 4. CLIENT: once "createPlayer" is received, run playerManager.createPlayer()
// set player.isMe = true

