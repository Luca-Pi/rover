import { CollisionDetector, MissionControl } from "../../mission-control"
import { Point, ToroidalPlanet } from "lib"
import { StubRoverReceptor } from "./StubRoverReceptor.ts"
import { RoverState } from "../../rover-receptor"
import { PlanetMapBuilder } from "../../map"
import { Command } from "../../enums"

export class MissionControlBuilder {
    private _planetSize = 10
    private _roverReceptor = new StubRoverReceptor()
    private _obstacles: Point[] = []

    Build(): MissionControl {
      const planet = new ToroidalPlanet(this._planetSize)

      const map = new PlanetMapBuilder()
        .WithSize(this._planetSize)
        .WithObstacles(this._obstacles)
        .Build()

        return new MissionControl(
          planet,
          new CollisionDetector(),
          map,
          this._roverReceptor,
        )
    }

    AwaitRoverStateForCommand(command: Command, roverState: RoverState) {
      this._roverReceptor = this._roverReceptor.WithCommandResult(command, roverState)
      return this
    }

    WithPlanetSize(planetSize: number) {
        this._planetSize = planetSize
        return this
    }

    WithObstacles(obstacles: Point[]) {
        this._obstacles = obstacles
        return this;
    }
}