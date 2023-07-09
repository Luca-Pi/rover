import { Orientation, Position, PositionBuilder } from "lib"
import { Rover } from "../../rover"


export class RoverBuilder {
  private _orientation: Orientation = Orientation.North
  private _position: Position = PositionBuilder.Origin()

  WithOrientation(orientation: Orientation): RoverBuilder {
    this._orientation = orientation
    return this
  }

  WithPosition(position: Position): RoverBuilder {
    this._position = position
    return this
  }

  Build(): Rover {
    return new Rover(this._orientation, this._position)
  }
}