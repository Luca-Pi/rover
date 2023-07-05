import { FixedEntity } from "./FixedEntity"
import { Point } from "../geometry"

export class Rock extends FixedEntity {
    constructor(point: Point) {
        super(point, "🪨", true)
    }
}
