import { Point, Position, Orientation } from "lib"
import { FixedEntity, Floor, Rock, Fog } from "./entity"
import { RoverState } from "../rover-receptor"
import { Renderable, RoverRender } from "../ui/renders"

export class PlanetMap {
  private map: Array<FixedEntity>[] = []
  private fogOfWar: Array<Fog>[] = []

  constructor(public size: number, obstacles: Point[] = []) {
    for (let y = 0; y < this.size; y++) {
      const row: FixedEntity[] = []
      const fogRow: Fog[] = []

      for (let x = 0; x < this.size; x++) {
        row.push(this.generateEntityOnPoint(new Point(x, y), obstacles))
        fogRow.push(new Fog(new Point(x, y)))
      }

      this.map.push(row)
      this.fogOfWar.push(fogRow)
    }
  }

  private generateEntityOnPoint(point: Point, obstacles: Point[]): FixedEntity {
    let entity: FixedEntity = new Floor(point)

    for(let obstacle of obstacles) {
      if (obstacle.x === point.x && obstacle.y === point.y) {
        entity = new Rock(point)
      }
    }

    return entity
  }

  getEntityAtPosition(position: Position): FixedEntity {
    return this.map[position.point.y][position.point.x]
  }

  generateMapWithRover(roverState: RoverState): Renderable[][] {
    return this.map.map((row, indexY) => {
      return row.map((entity, indexX) => {
        const fog = this.fogOfWar[indexY][indexX]

        if (indexX === roverState.position.x && indexY === roverState.position.y) {
          return new RoverRender(Orientation.fromString(roverState.orientation))
        }

        if (fog.isDiscovered) {
          return entity.Render
        }

        return fog.Render
      })
    })
  }

  discoverMapOnPosition(position: Point) {
    const fogOfWar = this.fogOfWar[position.y][position.x]
    fogOfWar.uncover()
  }
}
