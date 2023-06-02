import { Orientation } from "../enums"
import { Position } from "./geometry"

export class RoverState {
  public readonly orientation: Orientation
  public readonly position: Position

  public constructor(orientation: Orientation, position: Position) {
    this.orientation = orientation
    this.position = position
  }

  public WithDecrementedX(): RoverState {
    return new RoverState(this.orientation, this.position.decrementX())
  }

  public WithIncrementedX(): RoverState {
    return new RoverState(this.orientation, this.position.incrementX())
  }

  public WithIncrementedY(): RoverState {
    return new RoverState(this.orientation, this.position.incrementY())
  }

  public WithDecrementedY(): RoverState {
    return new RoverState(this.orientation, this.position.decrementY())
  }

  public WithClockwiseRotation(): RoverState {
    return new RoverState(this.orientation.ClockwiseRotation(), this.position)
  }

  public WithCounterClockwiseRotation(): RoverState {
    return new RoverState(this.orientation.CounterClockwiseRotation(), this.position)
  }
}
