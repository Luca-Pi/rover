import { FixedEntity } from "./FixedEntity"
import { Point } from "../geometry"

export class Fog extends FixedEntity {
    private _isDiscovered = false

    constructor(point: Point) {
        super(point, "🌫️", true)
    }

    get isDiscovered(): boolean {
        return this._isDiscovered
    }

    uncover(): void {
        this._isDiscovered = true
    }
}
