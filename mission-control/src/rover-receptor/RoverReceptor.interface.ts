import { Command } from "../enums"
import { RoverState } from "./RoverState.ts"

export interface IRoverReceptor {
  sendCommand(command: Command): Promise<RoverState>
}
