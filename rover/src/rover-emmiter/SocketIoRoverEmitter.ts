import { Server, Socket } from "socket.io"
import { createServer } from "http"
import { IRoverEmitter } from "./RoverEmitter"

export class SocketIoRoverEmitter implements IRoverEmitter {
  private _server: Server

  constructor() {
    const httpServer = createServer()
    this._server = new Server(httpServer, {
      cors: {
        origin: "*",
      }
    })
    httpServer.listen(3000)
    console.log("Rover emitter listening on port 3000")
  }

  listenForCommands(onCommandCallback: (command: string, respondWith: (response :any) => void) => void) {
    this._server.on("connection", (socket: Socket) => {
      socket.on("rover.command", onCommandCallback)
    })
  }
}
