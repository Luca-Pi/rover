import {FixedEntity} from "./FixedEntity"
import {Point} from "../geometry"

export class Obstacle extends FixedEntity {
    constructor(point: Point) {
        super(point, "O")
    }
}
