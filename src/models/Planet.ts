import { Rover } from "./Rover"
import { Orientation } from "../enums/Orientation"
import { roverConfig, planetConfig } from "../config"

export class Planet {
    get rover(): Rover {
      if (!this._rover) {
        throw new Error("Rover is not landed")
      }

      return this._rover;
    }
    private _rover?: Rover;
    constructor(private size: number) { }

    landRover(x: number, y: number, orientation: Orientation) {
      this._rover = new Rover(x, y, orientation, this.size)
    }

    render() {
      const grid = []
      for (let y = this.size - 1; y >= 0; y--) {
        const row = []
        for (let x = 0; x < this.size; x++) {
          row.push(this.renderCell(x, y))
        }
        grid.push(row.join(" "))
      }
      console.log(grid.join("\n"))
      console.log("\n")
    }

    private renderCell(x: number, y: number) {
      if (this._rover && this._rover.x === x && this._rover.y === y) {
        return this.renderRover(this.rover.orientation)
      } else {
        return this.renderEmptyCell()
      }
    }

    private renderRover(roverOrientation: Orientation) {
      console.log(this.rover.orientation)
      return roverConfig.render[roverOrientation]
    }

    private renderEmptyCell() {
      return planetConfig.emptyCellRender
    }
  }
