import { Point } from "lib"
import { PlanetMap } from "./PlanetMap.ts"

export class PlanetMapBuilder {
  private _size: number = 10
  private _obstacles: Point[] = []

  WithSize(size: number): PlanetMapBuilder {
    this._size = size
    return this
  }

  WithObstacles(obstacles: Point[]): PlanetMapBuilder {
    this._obstacles = obstacles
    return this
  }

  WithRandomObstacles(): PlanetMapBuilder {
    const obstacles: Point[] = []

    for (let i = 0; i < this._size; i++) {
      obstacles.push(new Point(Math.floor(Math.random() * this._size), Math.floor(Math.random() * this._size)))
    }

    this._obstacles = obstacles
    return this
  }

  Build(): PlanetMap {
    return new PlanetMap(this._size, this._obstacles)
  }
}
