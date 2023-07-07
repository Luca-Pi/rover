import { Orientation, Point, Position, ToroidalPlanet } from "lib"
import { Rover } from "../mission-control"

const turnLeftCases = [
  [ Orientation.North, Orientation.West ],
  [ Orientation.West, Orientation.South ],
  [ Orientation.East, Orientation.North ],
  [ Orientation.South, Orientation.East ],
]

describe('rovers turn left on a planet', () => {
  test.each(turnLeftCases)(
    "turning left at %p move to %p",
    (initialOrientation, expectedOrientation) => {
      const rover = new Rover(initialOrientation, new Position(new Point(0, 0), new ToroidalPlanet(10)))
      rover.turnLeft()
      expect(rover.state.orientation).toBe(expectedOrientation)
    }
  )
})

const turnRightCases = [
  [ Orientation.North, Orientation.East ],
  [ Orientation.East, Orientation.South ],
  [ Orientation.West, Orientation.North ],
  [ Orientation.South, Orientation.West ],
]

describe('rovers turn right on a planet', () => {
  test.each(turnRightCases)(
    "turning right at %p move to %p",
    (initialOrientation, expectedOrientation) => {
      const rover = new Rover(initialOrientation, new Position(new Point(0, 0), new ToroidalPlanet(10)))
      rover.turnRight()
      expect(rover.state.orientation).toBe(expectedOrientation)
    }
  )
})

