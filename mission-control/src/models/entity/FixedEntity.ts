import { Point } from "lib"
import { Renderable } from "../../ui/renders"

export abstract class FixedEntity {
  protected constructor(
    private _point: Point,
    private _hasCollision: boolean = false
  ) {
  }

  get point(): Point {
    return this._point
  }

  get hasCollision(): boolean {
    return this._hasCollision
  }

  abstract get Render(): Renderable
}
