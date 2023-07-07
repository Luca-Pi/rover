import { Command } from "../enums"
import { MissionControl, PlanetMap } from "../mission-control"
import { ConsoleRenderer } from "./ConsoleRenderer"
import { sleep } from "lib"
import { RoverState } from "../rover-receptor"

export class ConsoleInterface {
  constructor(
    private _missionControl: MissionControl,
    private _map: PlanetMap,
    private _renderer: ConsoleRenderer,
  ) {
    this.initMap()
    this.awaitCommand()
  }

  private async initMap() {
    this._renderer.init()
    const roverState = await this._missionControl.landRover()
    this._map.discoverMap(roverState)
    this.printMap(roverState, false)
  }

  private awaitCommand() {
    process.stdin.on('data', async (key) => {
      const command = Command.fromInput(key.toString())

      if (command === Command.Exit) {
        process.exit()
      }

      if (command === Command.StartRecording) {
        for (const key of this._renderer.getInstructions()) {
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
