import { Point } from "./Point"
import { Planet } from "../topology"

export class Position {
  constructor(private readonly _point: Point, private _planet: Planet) {
    this._point = _planet.standardize(_point)
  }

  get point(): Point {
    return this._point
  }

  incrementX(): Position {
    return new Position(this._point.IncrementX(), this._planet)
  }

  decrementX(): Position {
    return new Position(this._point.DecrementX(), this._planet)
  }

  incrementY(): Position {
    return new Position(this._point.IncrementY(), this._planet)
  }

  decrementY(): Position {
    return new Position(this._point.DecrementY(), this._planet)
  }
}
