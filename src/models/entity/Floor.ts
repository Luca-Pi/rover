import { FixedEntity } from "./FixedEntity"
import { Point } from "../geometry"

export class Floor extends FixedEntity {
    constructor(point: Point) {
        super(point, ".")
    }
}
