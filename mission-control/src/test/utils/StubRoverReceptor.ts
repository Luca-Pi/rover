import { IRoverReceptor, RoverState } from "../../rover-receptor"
import { Command } from "../../enums"

export class StubRoverReceptor implements IRoverReceptor {
  private _stubbedCommands: Map<Command, RoverState> = new Map()

  WithCommandResult(command:Command, receivedState: RoverState): StubRoverReceptor {
    this._stubbedCommands.set(command, receivedState)
    return this
  }

  sendCommand(command:Command): Promise<RoverState> {
    const roverState = this._stubbedCommands.get(command)

    if (roverState === undefined) {
      throw new Error("FakeRoverReceptor has no stored state for command: " + command)
    }

    return new Promise((resolve) => {
      resolve(roverState)
    })
  }
}