import { Position } from "../geometry"
import { Orientation } from "../../enums"
import { roverConfig } from "../../config"
import { RoverState } from "../RoverState"
import { Renderable } from "./Renderable"


export class Rover implements Renderable {
  private _state: RoverState

  constructor(orientation: Orientation, position: Position) {
    this._state = new RoverState(orientation, position)
  }

  get state(): RoverState {
    return this._state
  }

  moveForward(): RoverState {
    switch (this._state.orientation) {
      case Orientation.North:
        this._state = this._state.WithDecrementedY()
        break
      case Orientation.East:
        this._state = this._state.WithIncrementedX()
        break
      case Orientation.South:
        this._state = this._state.WithIncrementedY()
        break
      case Orientation.West:
        this._state = this._state.WithDecrementedX()
        break
    }

    return this._state
  }

  moveBackward(): RoverState {
    switch (this._state.orientation) {
      case Orientation.North:
        this._state = this._state.WithIncrementedY()
        break
      case Orientation.East:
        this._state = this._state.WithDecrementedX()
        break
      case Orientation.South:
        this._state = this._state.WithDecrementedY()
        break
      case Orientation.West:
        this._state = this._state.WithIncrementedX()
        break
    }

    return this._state
  }

  turnLeft(): RoverState {
    this._state = this._state.WithCounterClockwiseRotation()
    return this._state
  }

  turnRight(): RoverState {
    this._state = this._state.WithClockwiseRotation()
    return this._state
  }

  goTo(roverState: RoverState): RoverState {
    this._state = roverState
    return this._state
  }

  get shape(): string {
    return roverConfig.render[this._state.orientation.toString()]
  }
}
