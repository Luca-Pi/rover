import { FixedEntity } from "./FixedEntity"
import { Renderable, FogRender } from "../../ui/renders"
import { Point } from "lib"

export class Fog extends FixedEntity {
  private _isDiscovered = false

  constructor(point: Point) {
    super(point, true)
  }

  get isDiscovered(): boolean {
    return this._isDiscovered
  }

  uncover(): void {
    this._isDiscovered = true
  }

  get Render(): Renderable {
    return new FogRender()
  }
}
