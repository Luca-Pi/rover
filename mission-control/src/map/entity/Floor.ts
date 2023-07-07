import { FixedEntity } from "./FixedEntity.ts"
import { FloorRender, Renderable } from "../../ui/renders"
import { Point } from "lib"

export class Floor extends FixedEntity {
  constructor(point: Point) {
    super(point)
  }

  get Render(): Renderable {
    return new FloorRender()
  }
}
