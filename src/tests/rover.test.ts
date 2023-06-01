import { Orientation } from "../enums/Orientation";
import { Rover } from "../models/Rover";
import { Position } from "../models/Position";
import { Planet } from "../models/Planet";
import { Obstacle } from "../models/Obstacle";
import { Floor } from "../models/Floor";

const turnLeftCases: [Orientation, Orientation][] = [
  [Orientation.North, Orientation.West],
  [Orientation.West, Orientation.South],
  [Orientation.East, Orientation.North],
  [Orientation.South, Orientation.East],
];

describe('rovers turn left on a planet', () => {
  test.each(turnLeftCases)(
    "turning left from %p should result in orientation %p",
    (initialOrientation, expectedOrientation) => {
      const rover = new Rover(new Position(0, 0), initialOrientation, new Planet(10));
      rover.turnLeft();
      expect(rover.orientation).toBe(expectedOrientation);
    }
  );
});

const turnRightCases: [Orientation, Orientation][] = [
  [Orientation.North, Orientation.East],
  [Orientation.East, Orientation.South],
  [Orientation.West, Orientation.North],
  [Orientation.South, Orientation.West],
];

describe('rovers turn right on a planet', () => {
  test.each(turnRightCases)(
    "turning right from %p should result in orientation %p",
    (initialOrientation, expectedOrientation) => {
      const rover = new Rover(new Position(0, 0), initialOrientation, new Planet(10));
      rover.turnRight();
      expect(rover.orientation).toBe(expectedOrientation);
    }
  );
});

describe('rovers move forward and backward on a planet', () => {
  let rover: Rover;
  let planet: Planet;

  beforeEach(() => {
    planet = new Planet(3);
    console.log(planet.map[0][0])
    planet.map = [
      [new Floor(new Position(0, 0)), new Floor(new Position(1, 0)), new Floor(new Position(2, 0))],
      [new Floor(new Position(0, 1)), new Floor(new Position(1, 1)), new Floor(new Position(2, 1))],
      [new Floor(new Position(0, 2)), new Floor(new Position(1, 2)), new Floor(new Position(2, 2))],
    ]
    rover = new Rover(new Position(1, 1), Orientation.North, planet);
  });

  it('should move forward', () => {
    console.log(planet.render())
    rover.moveForward();
    expect(rover.position).toEqual(new Position(1, 0));
  });

  it('should move backward', () => {
    rover.moveBackward();
    expect(rover.position).toEqual(new Position(1, 2));
  });

  it('should not move forward when there is an obstacle', () => {
    const obstaclePosition = new Position(1, 0);
    planet.map[obstaclePosition.y][obstaclePosition.x] = new Obstacle(obstaclePosition);
    rover.moveForward();
    expect(rover.position).toEqual(new Position(1, 1));
  });
});

describe('rovers shape on a planet', () => {
  it('should return correct shape when facing North', () => {
    const rover = new Rover(new Position(0, 0), Orientation.North, new Planet(10));
    const shape = rover.shape(rover.orientation);
    expect(shape).toBe("^");
  });

  it('should return correct shape when facing East', () => {
    const rover = new Rover(new Position(0, 0), Orientation.East, new Planet(10));
    const shape = rover.shape(rover.orientation);
    expect(shape).toBe(">");
  });

  it('should return correct shape when facing West', () => {
    const rover = new Rover(new Position(0, 0), Orientation.West, new Planet(10));
    const shape = rover.shape(rover.orientation);
    expect(shape).toBe("<");
  });

  it('should return correct shape when facing South', () => {
    const rover = new Rover(new Position(0, 0), Orientation.South, new Planet(10));
    const shape = rover.shape(rover.orientation);
    expect(shape).toBe("v");
  });
});