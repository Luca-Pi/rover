import { Orientation } from "../topology"

export const roverConfig = {
  initialX: 4,
  initialY: 4,
  initialOrientation: Orientation.North,
  render : {
    [Orientation.North.toString()]: "⬆️",
    [Orientation.East.toString()]: "➡️",
    [Orientation.South.toString()]: "⬇️",
    [Orientation.West.toString()]: "⬅️",
  }
}
