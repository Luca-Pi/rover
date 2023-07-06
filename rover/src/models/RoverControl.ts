import { Command } from "../enums"
import { Rover } from "./entity"
import { RoverState } from "./RoverState"
import { IMissionControlConnection } from "./MissionControlConnection.interface"

export class RoverControl {
  constructor(
    private rover: Rover,
    private missionControlConnection: IMissionControlConnection
) {}

  executeCommand(command: string): RoverState | undefined {
    switch (Command.fromString(command)) {
      case Command.Up:
        return this.rover.moveForward()
      case Command.Down:
        return this.rover.moveBackward()
      case Command.Left:
        return this.rover.turnLeft()
      case Command.Right:
        return this.rover.turnRight()
      case Command.Land:
        return this.rover.state
      case Command.GoBack:
        return this.rover.goBack()
    }
  }

  listenForCommands() {
    this.missionControlConnection.listenForCommands((command, respondWith) => {
      console.log(`Received command: ${command}`)
      const roverState = this.executeCommand(command)

      if (roverState) {
        respondWith(roverState.toObject())
      }
    })
  }
}
