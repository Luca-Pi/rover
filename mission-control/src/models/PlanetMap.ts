import { FixedEntity, Floor, Rock } from "./entity"
import { Point, Position } from "./geometry"
import { planetConfig, roverConfig } from "../config"
import { Fog } from "./entity/Fog";

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

  generateMapWithRover(roverState: any): string {
    return this.map.map((row, indexY) => {
      return row.map((entity, indexX) => {
        const fog = this.fogOfWar[indexY][indexX]

        if (indexX === roverState.position.x && indexY === roverState.position.y) {
          return roverConfig.render[roverState.orientation]
        }

        if(fog.isDiscovered) {
          return entity.shape
        }

        return fog.shape
      }).join("")
    }).join("\n")
  }

  discoverMap(roverState: any) {
    const fogOfWar = this.fogOfWar[roverState.position.y][roverState.position.x]
    fogOfWar.uncover()
  }
}
