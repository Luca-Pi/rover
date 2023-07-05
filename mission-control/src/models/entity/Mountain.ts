import { FixedEntity } from "./FixedEntity"
import { Point } from "../geometry"

export class Mountain extends FixedEntity {
    constructor(point: Point) {
        super(point, "⛰️", true)
    }
}
