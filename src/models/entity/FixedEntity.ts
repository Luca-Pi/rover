import { Point } from "../geometry"
import { Renderable } from "./Renderable"

export class FixedEntity implements Renderable {
  constructor(private _point: Point, private _shape: string) {}

  get point(): Point {
    return this._point
  }

  get shape(): string {
    return this._shape
  }
}
