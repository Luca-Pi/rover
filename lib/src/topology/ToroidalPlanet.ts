import { Point } from "../geometry"
import { Planet } from "./Planet"

export class ToroidalPlanet implements Planet {
  private readonly _pointMax: Point

  constructor(readonly size: number) {
    this._pointMax = new Point(size, size)
  }

  standardize(point: Point): Point {
    const standardizedSigned = point.modulo(this.size).modulo(-this.size)
    return standardizedSigned.add(this._pointMax).modulo(this.size)
  }
}
