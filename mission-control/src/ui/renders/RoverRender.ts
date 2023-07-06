import { Renderable } from "./Renderable"
import { Orientation } from "lib"

export class RoverRender extends Renderable {
  constructor(private _orientation: Orientation) {
    super()
  }

  forConsole(): string {
    switch (this._orientation) {
      case Orientation.North:
        return "^"
      case Orientation.South:
        return "v"
      case Orientation.West:
        return "<"
      case Orientation.East:
        return ">"
      default:
        throw new Error("orientation does not exists")
    }
  }

  forWeb(): string {
    switch (this._orientation) {
      case Orientation.North:
        return "⬆️"
      case Orientation.South:
        return "⬇️"
      case Orientation.West:
        return "⬅️"
      case Orientation.East:
        return "➡️"
      default:
        throw new Error("orientation does not exists")
    }
  }
}
