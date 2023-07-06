import { Point } from "./geometry"
import { SystemCoordinates } from "lib"

export class ToroidalPlanet implements SystemCoordinates {
  private readonly _pointMax: Point

  constructor(readonly size: number) {
    this._pointMax = new Point(size, size)
  }

  standardize(point: Point): Point {
    const standardizedSigned = point.modulo(this.size).modulo(-this.size)
    return standardizedSigned.add(this._pointMax).modulo(this.size)
  }
}
