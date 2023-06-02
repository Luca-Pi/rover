import {Point} from "./Point";
import {SystemCoordinates} from "../SystemCoordinates";

export class Position {
    constructor(private readonly _point: Point, private _systemCoordinates: SystemCoordinates) {
        this._point = _systemCoordinates.standardize(_point);
    }

    get point(): Point {
        return this._point
    }

    incrementX() : Position {
        return new Position(this._point.IncrementX(), this._systemCoordinates);
    }

    decrementX() : Position {
        return new Position(this._point.DecrementX(), this._systemCoordinates);
    }

    incrementY() : Position {
        return new Position(this._point.IncrementY(), this._systemCoordinates);
    }

    decrementY() : Position {
        return new Position(this._point.DecrementY(), this._systemCoordinates);
    }

    isSamePosition(point: Point) : boolean {
        return this._point.isSamePoint(point)
    }
}
