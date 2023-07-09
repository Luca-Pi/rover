import { Command } from "../enums"
import { MissionControl } from "../mission-control"
import { ConsoleRenderer } from "./ConsoleRenderer"
import { Point, sleep } from "lib"
import { RoverState } from "../rover-receptor"
import { PlanetMap } from "../map"

export class ConsoleInterface {
  constructor(
    private _missionControl: MissionControl,
    private _map: PlanetMap,
    private _renderer: ConsoleRenderer,
  ) {
    this.initInterface()
    this.awaitCommand()
  }

  private async initInterface() {
    this._renderer.init()
    const roverState = await this._missionControl.landRover()
    this._map.discoverMapOnPosition(new Point(roverState.position.x, roverState.position.y))
    this.printMap(roverState, false)
  }

  private awaitCommand() {
    process.stdin.on('data', async (key) => {
      const command = Command.fromInput(key.toString())

      if (command === Command.Exit) {
        process.exit()
      }

      if (command === Command.StartRecording) {
        for (const key of await this._renderer.getInstructions()) {
          const command = Command.fromInput(key)

          const roverState = await this._missionControl.sendCommand(command)
          this.printMap(roverState)
          await sleep(1000)
        }

        return
      }

      const hoverState = await this._missionControl.sendCommand(command)
      this.printMap(hoverState)
    })
  }

  printMap(roverState: RoverState, overwrite: boolean = true) {
    const map = this._map.generateMapWithRover(roverState)
    this._renderer.printGrid(map, overwrite)
  }
}
