import { Orientation } from "lib"
import { RoverBuilder } from "./utils/rover.builder"

const each = require("jest-each").default

describe('FEATURE Rotation', () => {
  each([
    [ Orientation.North, 1, Orientation.East ],
    [ Orientation.North, 2, Orientation.South ],
    [ Orientation.East, 3, Orientation.North ],
    [ Orientation.South, 4, Orientation.South ],
  ])
    .it('Given a rover oriented %s ' +
      'when it turns right %s times ' +
      'then its orientation is %s', (initialOrientation: Orientation, numberOfRotation: number, expectedFinalOrientation: Orientation) => {
      let rover = new RoverBuilder().WithOrientation(initialOrientation).Build()
      let roverState = rover.state

      for (let rotations = 0; rotations < numberOfRotation; rotations++) {
        roverState = rover.turnRight()
      }

      expect(roverState.orientation).toEqual(expectedFinalOrientation)
    })

  each([
    [ Orientation.North, 1, Orientation.West ],
    [ Orientation.North, 2, Orientation.South ],
    [ Orientation.East, 3, Orientation.South ],
    [ Orientation.South, 4, Orientation.South ],
  ])
    .it('Given a rover oriented %s ' +
      'when it turns left %s times ' +
      'then its orientation is %s', (initialOrientation: Orientation, numberOfRotation: number, expectedFinalOrientation: Orientation) => {
      let rover = new RoverBuilder().WithOrientation(initialOrientation).Build()
      let roverState = rover.state

      for (let rotations = 0; rotations < numberOfRotation; rotations++) {
        roverState = rover.turnLeft()
      }

      expect(roverState.orientation).toEqual(expectedFinalOrientation)
    })
})