import {Entity} from "./Entity"
import {Position} from "./Position"
import {Planet} from "./Planet"
import {Obstacle} from "./Obstacle"
import {Command} from "./Command"
import {Console} from "./Console"
import {sleep} from "../utils/sleep"
import {Orientation} from "../enums/Orientation"
import {roverConfig} from "../config"

export class Rover extends Entity {
  constructor(
    public position: Position,
    public orientation: Orientation,
    private planet: Planet
  ) {
    super()
  }

  moveForward() {
    const lastPosition = this.position
    switch (this.orientation) {
      case Orientation.North:
        this.position = this.position.decrementYFromPlanet(this.planet.size)
        break
      case Orientation.East:
        this.position = this.position.incrementXFromPlanet(this.planet.size)
        break
      case Orientation.South:
        this.position = this.position.incrementYFromPlanet(this.planet.size)
        break
      case Orientation.West:
        this.position = this.position.decrementXFromPlanet(this.planet.size)
        break
    }
    if (this.isOnObstacle(this.position)) {
      this.position = lastPosition
    }
  }

  moveBackward() {
    const lastPosition = this.position

    switch (this.orientation) {
      case Orientation.North:
        this.position = this.position.incrementYFromPlanet(this.planet.size)
        break
      case Orientation.East:
        this.position = this.position.decrementXFromPlanet(this.planet.size)
        break
      case Orientation.South:
        this.position = this.position.decrementYFromPlanet(this.planet.size)
        break
      case Orientation.West:
        this.position = this.position.incrementXFromPlanet(this.planet.size)
        break
    }

    if (this.isOnObstacle(this.position)) {
      this.position = lastPosition
    }
  }

  turnLeft() {
    switch (this.orientation) {
      case Orientation.North:
        this.orientation = Orientation.West
        break
      case Orientation.West:
        this.orientation = Orientation.South
        break
      case Orientation.East:
        this.orientation = Orientation.North
        break
      case Orientation.South:
        this.orientation = Orientation.East
        break
    }
  }

  turnRight() {
    switch (this.orientation) {
      case "N":
        this.orientation = Orientation.East
        break
      case "E":
        this.orientation = Orientation.South
        break
      case "W":
        this.orientation = Orientation.North
        break
      case "S":
        this.orientation = Orientation.West
        break
    }
  }

  shape(roverOrientation: Orientation): string {
    return roverConfig.render[roverOrientation]
  }

  isOnObstacle(position: Position): boolean {
    const entity = this.planet.getEntityAtPosition(position)
    return entity instanceof Obstacle
  }

  command(command: string) {
    switch (Command.FromInput(command)) {
      case Command.Up:
        this.moveForward()
        break
      case Command.Down:
        this.moveBackward()
        break
      case Command.Left:
        this.turnLeft()
        break
      case Command.Right:
        this.turnRight()
        break
      case Command.StartRecording:
        this.recordAndExecute()
        break
      default:
        // do nothing
        break
    }
  }

  private async recordAndExecute() {
    const instructions = Console.getInstructions()

    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];
      this.command(instruction)
      await sleep(250)
      this.planet.render()
    }
  }
}
