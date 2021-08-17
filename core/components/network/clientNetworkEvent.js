import { io } from "socket.io-client";
var socket = io("http://localhost:3000");

export const clientNetworking = () => {
  socket.on("connect", () => {
    console.log("you connected to the server");
    socket.emit("new-player", { id: Math.random() });
    socket.on("online-players", (data) => {
      console.log(data);
      for (let elem in data) {
        /**
           var newEnt = new box.Unit({ owner: elem, id: elem });
        newEnt.test();
         */
      }
    });
  });
};
