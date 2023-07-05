import { UiInterface } from "./ui.interface";
import { Command } from "../enums";
import { ConsoleRenderer, MissionControl, PlanetMap } from "../models";
import { sleep } from "../utils";

export class ConsoleInterface implements UiInterface {
  constructor(
    private _missionControl: MissionControl,
    private _map: PlanetMap,
  ) {
    this.initConsole()
    this.awaitCommand()
  }

  private async initConsole() {
    ConsoleRenderer.Init()
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
        for (const key of ConsoleRenderer.getInstructions()) {
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

  printMap(roverState: any, overwrite: boolean = true) {
    const grid = this._map.generateMapWithRover(roverState)
    ConsoleRenderer.printGrid(grid, overwrite)
  }
}
