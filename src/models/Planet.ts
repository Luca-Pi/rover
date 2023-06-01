import {Rover} from "./Rover"
import {Orientation} from "../enums/Orientation"
import {planetConfig} from "../config"
import {Position} from "./Position";
import {Entity} from "./Entity";
import {Floor} from "./Floor";
import {Obstacle} from "./Obstacle";
import {Console} from "./Console";

export class Planet {

  private map: Entity[][] = []

  constructor(public size: number) {
    for (let y = 0; y < size; y++) {
      const row: Entity[] = []
      for (let x = 0; x < size; x++) {
        let entity: Entity = new Floor(new Position(x, y))
        if (Math.random() < planetConfig.obstacleDensity) {
          entity = new Obstacle(new Position(x, y))
        }
        row.push(entity)
      }
      this.map.push(row)
    }
  }

  get rover(): Rover {
    if (!this._rover) {
      throw new Error("Rover is not landed")
    }

    return this._rover;
  }

  private _rover?: Rover;


  landRover(position: Position, orientation: Orientation) {
    this._rover = new Rover(position, orientation, this)
  }

  render(overwrite = true) {
    const renderedMap: string[][] = []

    this.map.forEach((row) => {
      const renderedRow: string[] = []

      row.forEach((entity) => {
        const position = entity.position
        renderedRow[position.x] = entity.shape(this._rover?.orientation)
      })

      renderedMap.push(renderedRow)
    })

    if (this._rover) {
      const roverPosition = this._rover.position
      renderedMap[roverPosition.y][roverPosition.x] = this._rover.shape(this._rover.orientation)
    }

    Console.printGrid(renderedMap.map((row) => row.join(" ")).join("\n"), overwrite)
  }

  getEntityAtPosition(position: Position): Entity {
    return this.map[position.y][position.x]
  }
}
