export class Orientation {
  static North: Orientation = new Orientation("North")
  static South: Orientation = new Orientation("South")
  static East: Orientation = new Orientation("East")
  static West: Orientation = new Orientation("West")
  private readonly _representation: string

  private constructor(representation: string) {
    this._representation = representation
  }

  ClockwiseRotation(): Orientation {
    if (this == Orientation.East) return Orientation.South
    if (this == Orientation.South) return Orientation.West
    if (this == Orientation.West) return Orientation.North
    return Orientation.East
  }

  CounterClockwiseRotation(): Orientation {
    if (this == Orientation.East) return Orientation.North
    if (this == Orientation.South) return Orientation.East
    if (this == Orientation.West) return Orientation.South
    return Orientation.West
  }

  toString(): string {
    return this._representation
  }

  static fromString(orientation: string): Orientation {
    switch (orientation) {
      case "North":
        return Orientation.North
      case "South":
        return Orientation.South
      case "West":
        return Orientation.West
      case "East":
        return Orientation.East
      default:
        throw new Error(`${orientation} does not exists`)
    }
  }
}
