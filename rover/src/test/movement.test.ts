import { Orientation, Point, PositionBuilder, ToroidalPlanet } from "lib"
import { RoverBuilder } from "./utils/rover.builder"

const each = require("jest-each").default

describe('FEATURE Movement', () => {
  each([
    [ Orientation.North, 1, 1, 1, 0 ],
    [ Orientation.West, 2, 1, 1, 1 ],
    [ Orientation.South, 3, 1, 3, 2 ],
    [ Orientation.East, 4, 1, 5, 1 ],
  ])
    .it('Given a rover oriented %s at starting position %s,%s ' +
      'when it move forward' +
      'then its position is %s,%s', (
      initialOrientation: Orientation,
      initialX: number, initialY: number,
      expectedX: number, expectedY: number,
    ) => {
      let rover = new RoverBuilder()
        .WithOrientation(initialOrientation)
        .WithPosition(new PositionBuilder().WithCoordinates(initialX, initialY).Build())
        .Build()

      const roverState = rover.moveForward()

      expect(roverState.position).toEqual(new PositionBuilder().WithCoordinates(expectedX, expectedY).Build())
    })

  each([
    [ Orientation.North, 1, 1, 1, 2 ],
    [ Orientation.West, 2, 1, 3, 1 ],
    [ Orientation.South, 3, 1, 3, 0 ],
    [ Orientation.East, 4, 1, 3, 1 ],
  ])
    .it('Given a rover oriented %s at starting position %s,%s ' +
      'when it move backward' +
      'then its position is %s,%s', (
      initialOrientation: Orientation,
      initialX: number, initialY: number,
      expectedX: number, expectedY: number,
    ) => {
      let rover = new RoverBuilder()
        .WithOrientation(initialOrientation)
        .WithPosition(new PositionBuilder().WithCoordinates(initialX, initialY).Build())
        .Build()

      const roverState = rover.moveBackward()

      expect(roverState.position).toEqual(new PositionBuilder().WithCoordinates(expectedX, expectedY).Build())
    })

  each([
    [ 2, 1, 1, 1, 0 ],
    [ 10, 5, 0, 5, 9 ],
    [ 15, 3, 0, 3, 14 ],
  ])
    .it('Given a planet with of size %s and a rover at starting position %s,%s ' +
    'when it move to the end of the planet' +
    'then its position is %s,%s', (
    planetSize: number,
    initialX: number, initialY: number,
    expectedX: number, expectedY: number,
  ) => {
    const roverPosition = new PositionBuilder()
      .OnPlanet(new ToroidalPlanet(planetSize))
      .WithCoordinates(initialX, initialY)
      .Build()
    let rover = new RoverBuilder()
      .WithPosition(roverPosition)
      .Build()

    const roverState = rover.moveForward()

    expect(roverState.position.point.isSamePoint(new Point(expectedX, expectedY))).toBe(true)
  })
})