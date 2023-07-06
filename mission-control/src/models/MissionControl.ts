import { Command } from "../enums"
import { PlanetMap } from "./PlanetMap"
import { CollisionDetector } from "./CollisionDetector"
import { Point, Position } from "./geometry";
import { SystemCoordinates } from "../topology";
import {IRoverConnector} from "./RoverConnector.interface.ts";

export class MissionControl {
  constructor(
    private planet: SystemCoordinates,
    private collisionDetector: CollisionDetector,
    private map: PlanetMap,
    private roverConnector: IRoverConnector,
  ) {

  }

  async sendCommand(command: Command): Promise<void> {
    const roverState = await this.roverConnector.sendCommand(command)
    this.map.discoverMap(roverState)
    return await this.detectCollision(roverState)
  }

  async detectCollision(roverState: any) {
      const roverIsOnObstacle = this.collisionDetector.isEntityOnObstacle(
        this.map,
        new Position(
          new Point(roverState.position.x, roverState.position.y),
          this.planet
        ),
      )

      if (roverIsOnObstacle) {
        return this.roverConnector.sendCommand(Command.GoBack)
      }
      else {
        return roverState
      }
  }

  async landRover() {
    return this.roverConnector.sendCommand(Command.Land)
  }
}
