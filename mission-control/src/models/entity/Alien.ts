import { FixedEntity } from "./FixedEntity"
import { Point } from "../geometry"

export class Alien extends FixedEntity {
    constructor(point: Point) {
        super(point, "👽", true)
    }
}
