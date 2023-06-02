import { FixedEntity, Floor, Rover, Obstacle } from "./entity"
import { Point, Position } from "./geometry"
import { planetConfig } from "../config"
import { Console } from "./Console"

export class PlanetMap {
  private map: Array<FixedEntity>[] = []

  constructor(private _rover: Rover, size: number) {
    for (let y = 0; y < size; y++) {
      const row: FixedEntity[] = []
      for (let x = 0; x < size; x++) {
        let entity: FixedEntity = new Floor(new Point(x, y))

        if (Math.random() < planetConfig.obstacleDensity) {
          entity = new Obstacle(new Point(x, y))
        }

        row.push(entity)
      }
      this.map.push(row)
    }
  }

  getEntityAtPosition(position: Position): FixedEntity {
    return this.map[position.point.y][position.point.x]
  }

  render(overwriteMap = true) {
    const grid = this.map.map((row, indexY) => {
      return row.map((entity, indexX) => {
        if (indexX === this._rover.state.position.point.x && indexY === this._rover.state.position.point.y) {
          return this._rover.shape
        }
        return entity.shape
      }).join(" ")
    }).join("\n")

    Console.printGrid(grid, overwriteMap)
  }
}
