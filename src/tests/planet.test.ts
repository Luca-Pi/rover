import { Orientation } from "../enums/Orientation";
import { Floor } from "../models/Floor";
import { Obstacle } from "../models/Obstacle";
import { Planet } from "../models/Planet";
import { Position } from "../models/Position";

describe('Planet', () => {
  let planet: Planet;

  beforeEach(() => {
    planet = new Planet(5);
  });

  it('should create a planet with the specified size', () => {
    expect(planet.size).toBe(5);
  });

  it('should land a rover at the specified position and orientation', () => {
    const position = new Position(2, 2);
    const orientation = Orientation.North;
    planet.landRover(position, orientation);
    const rover = planet.rover;
    expect(rover).toBeDefined();
    expect(rover?.position).toEqual(position);
    expect(rover?.orientation).toBe(orientation);
  });

  it('should return the entity at the specified position', () => {
    const floorPosition = new Position(1, 1);
    const floorEntity = new Floor(floorPosition);
    planet.getEntityAtPosition = jest.fn().mockReturnValue(floorEntity);

    const fetchedFloorEntity = planet.getEntityAtPosition(floorPosition);

    expect(fetchedFloorEntity).toBe(floorEntity);
  });
});
