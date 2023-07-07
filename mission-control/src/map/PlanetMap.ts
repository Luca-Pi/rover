import { Point, Position, planetConfig, Orientation } from "lib"
import { FixedEntity, Floor, Rock, Fog } from "./entity"
import { Renderable, RoverRender } from "../ui/renders"
import { RoverState } from "../rover-receptor"

export class PlanetMap {
  private map: Array<FixedEntity>[] = []
  private fogOfWar: Array<Fog>[] = []

  constructor(public size: number) {
    for (let y = 0; y < this.size; y++) {
      const row: FixedEntity[] = []
      const fogRow: Fog[] = []

      for (let x = 0; x < this.size; x++) {
        row.push(this.generateEntityOnPoint(new Point(x, y)))
        fogRow.push(new Fog(new Point(x, y)))
      }

      this.map.push(row)
      this.fogOfWar.push(fogRow)
    }
  }

  private generateEntityOnPoint(point: Point): FixedEntity {
    let entity: FixedEntity = new Floor(point)

    if (Math.random() < planetConfig.rockDensity) {
      entity = new Rock(point)
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

  discoverMap(roverState: RoverState) {
    const fogOfWar = this.fogOfWar[roverState.position.y][roverState.position.x]
    fogOfWar.uncover()
  }
}
