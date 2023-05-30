import {Planet} from "../models/Planet"
import {Orientation} from "../enums/Orientation";
import {Rover} from "../models/Rover";

const turnLeftCases = [
  [Orientation.North, Orientation.West],
  [Orientation.West, Orientation.South],
  [Orientation.East, Orientation.North],
  [Orientation.South, Orientation.East],
]

describe('rovers turn left on a planet', () => {
    test.each(turnLeftCases)(
      "turning left at %p move to %p",
      (initialOrientation, expectedOrientation) => {
        const rover = new Rover(0, 0, initialOrientation, 10)
        rover.turnLeft()
        expect(rover.orientation).toBe(expectedOrientation)
      }
    );
})

const turnRightCases = [
  [Orientation.North, Orientation.East],
  [Orientation.East, Orientation.South],
  [Orientation.West, Orientation.North],
  [Orientation.South, Orientation.West],
]

describe('rovers turn right on a planet', () => {
    test.each(turnRightCases)(
      "turning right at %p move to %p",
      (initialOrientation, expectedOrientation) => {
        const rover = new Rover(0, 0, initialOrientation, 10)
        rover.turnRight()
        expect(rover.orientation).toBe(expectedOrientation)
      }
    );
})
