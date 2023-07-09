import { Point, Position } from "../../geometry"
import { Planet } from "../../topology"
import { InfiniteAndEmptyPlanet } from "./InfiniteAndEmptyPlanet"

export class PositionBuilder {
  static Origin(): Position {
    return new PositionBuilder().Build()
  }

  private _x = 0
  private _y = 0
  private _planet : Planet = new InfiniteAndEmptyPlanet()

  public WithCoordinates(x: number, y: number): PositionBuilder {
    this._x = x
    this._y = y
    return this
  }

  Build() : Position {
    return new Position(new Point(this._x, this._y), this._planet);
  }

  Origin() {
    return this.WithCoordinates(0,0)
  }

  OnPlanet(planet: Planet) {
    this._planet = planet
    return this
  }
}