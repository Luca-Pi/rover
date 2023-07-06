import { FixedEntity } from "./FixedEntity"
import { Renderable, RockRender } from "../../ui/renders"
import { Point } from "lib"

export class Rock extends FixedEntity {
  constructor(point: Point) {
    super(point, true)
  }

  get Render(): Renderable {
    return new RockRender()
  }
}
