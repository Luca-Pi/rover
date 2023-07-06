import { Command } from "../enums"
import { RoverState } from "./RoverState.ts"

export interface IRoverConnector {
  sendCommand(command: Command): Promise<RoverState>
}
