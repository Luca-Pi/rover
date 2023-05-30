import { Orientation } from "../enums/Orientation"

export const roverConfig = {
  initialX: 4,
  initialY: 4,
  initialOrientation: Orientation.North,
  render : {
    [Orientation.North]: "^",
    [Orientation.East]: ">",
    [Orientation.South]: "v",
    [Orientation.West]: "<",
  }
}
