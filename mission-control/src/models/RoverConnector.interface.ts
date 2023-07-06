import {Command} from "../enums"

export interface IRoverConnector {
  sendCommand(command: Command): Promise<any>
}
