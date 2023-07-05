import { io, Socket } from "socket.io-client"
import { Command } from "../enums"
import { Server } from "socket.io";
import { createServer } from "http";

export class MissionControlConnection {
  private _server: Server

  constructor() {
    const httpServer = createServer({

    })
    this._server = new Server(httpServer, {
      cors: {
        origin: "*",
      }
    })
    console.log("Mission Control Server listening on port 3000")
    httpServer.listen(3000)
  }

  listenForCommands(onCommandCallback: (command: string, respondWith: (response :any) => void) => void) {
    this._server.on("connection", (socket: any) => {
      socket.on("rover.command", onCommandCallback)
    })
  }

  // this._socket.on("rover.command", (test, _, call) => {
  //   // call("response")
  //   return onCommandCallback(test)
  // })

  // emitResponse(roverState: any) {
  //   this._socket.emit("rover.response", roverState)
  // }
}
