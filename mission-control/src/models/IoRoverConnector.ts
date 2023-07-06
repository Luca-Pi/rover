import { Command } from "../enums";
import { io, Socket } from "socket.io-client";
import {IRoverConnector} from "./RoverConnector.interface.ts";

export class IoRoverConnector implements IRoverConnector {
  _socket: Socket

  constructor() {
    this._socket = io("http://localhost:3000")
  }

    async sendCommand(command: Command): Promise<any> {
    return new Promise((resolve) => {
      this._socket.emit("rover.command", command.toString(), (response: any) => {
        resolve(response)
      })
    })
  }
}
