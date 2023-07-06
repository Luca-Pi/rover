import { Command } from "../enums"
import { PlanetMap } from "./PlanetMap"
import { CollisionDetector } from "./CollisionDetector"
import { Point, Position, SystemCoordinates } from "lib"
import { IRoverConnector, RoverState } from "../rover-connector"

export class MissionControl {
  constructor(
    private planet: SystemCoordinates,
    private collisionDetector: CollisionDetector,
    private map: PlanetMap,
    private roverConnector: IRoverConnector,
  ) {

  }

  async sendCommand(command: Command): Promise<RoverState> {
    const roverState = await this.roverConnector.sendCommand(command)
    this.map.discoverMap(roverState)
    return await this.detectCollision(roverState)
  }

  async detectCollision(roverState: RoverState) {
    const roverIsOnObstacle = this.collisionDetector.isEntityOnObstacle(
      this.map,
      new Position(
        new Point(roverState.position.x, roverState.position.y),
        this.planet
      ),
    )

    if (roverIsOnObstacle) {
      return this.roverConnector.sendCommand(Command.GoBack)
    } else {
      return roverState
    }
  }

  async landRover() {
    return this.roverConnector.sendCommand(Command.Land)
  }
}
