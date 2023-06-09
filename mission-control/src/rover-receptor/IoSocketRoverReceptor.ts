import { io, Socket } from "socket.io-client"
import { Command } from "../enums"
import { IRoverReceptor } from "./RoverReceptor.interface.ts"
import { RoverState } from "./RoverState.ts"

export class IoSocketRoverReceptor implements IRoverReceptor {
  _socket: Socket

  constructor() {
    this._socket = io("http://localhost:3000")
  }

  async sendCommand(command: Command): Promise<RoverState> {
    return new Promise((resolve) => {
      this._socket.emit("rover.command", command.toString(), (response: RoverState) => {
        resolve(response)
      })
    })
  }
}
