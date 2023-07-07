import { Position, Orientation } from "lib"

import { RoverState } from "./RoverState"

export class Rover {
  private _state: RoverState
  private _previousState: RoverState | undefined

  constructor(orientation: Orientation, position: Position) {
    this._state = new RoverState(orientation, position)
  }

  get state(): RoverState {
    return this._state
  }

  moveForward(): RoverState {
    this._previousState = this._state

    switch (this._state.orientation) {
      case Orientation.North:
        return this._state = this._state.WithDecrementedY()
      case Orientation.East:
        return this._state = this._state.WithIncrementedX()
      case Orientation.South:
        return this._state = this._state.WithIncrementedY()
      case Orientation.West:
        return this._state = this._state.WithDecrementedX()
      default:
        return this._state
    }
  }

  moveBackward(): RoverState {
    this._previousState = this._state

    switch (this._state.orientation) {
      case Orientation.North:
        return this._state = this._state.WithIncrementedY()
      case Orientation.East:
        return this._state = this._state.WithDecrementedX()
      case Orientation.South:
        return this._state = this._state.WithDecrementedY()
      case Orientation.West:
        return this._state = this._state.WithIncrementedX()
      default:
        return this._state
    }
  }

  turnLeft(): RoverState {
    this._previousState = this._state
    return this._state = this._state.WithCounterClockwiseRotation()
  }

  turnRight(): RoverState {
    this._previousState = this._state
    return this._state = this._state.WithClockwiseRotation()
  }

  goBack(): RoverState {
    return this._state = this._previousState || this._state
  }
}
