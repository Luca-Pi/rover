import {Entity} from "./Entity"
import {Position} from "./Position"

export class Floor extends Entity {
    constructor(
        public position: Position,
    ) {
        super()
    }


    shape(): string {
        return "."
    }

}
