import { Server } from "socket.io"
import { createServer } from "http"
import { IMissionControlConnection } from "./MissionControlConnection.interface"

export class IoMissionControlConnection implements IMissionControlConnection {
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
}
