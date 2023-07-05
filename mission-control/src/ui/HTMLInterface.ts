import { UiInterface } from "./ui.interface";
import { Command } from "../enums";
import { ConsoleRenderer, MissionControl, PlanetMap } from "../models";
import { sleep } from "../utils";
import { HTMLRenderer } from "./HTMLRenderer.ts";

export class HTMLInterface implements UiInterface {
  constructor(
    private _missionControl: MissionControl,
    private _map: PlanetMap,
  ) {
    this.initMap()
    this.awaitCommand()
  }

  private async initMap() {
    HTMLRenderer.initMap(this._map.size)
    const roverState = await this._missionControl.landRover()
    this._map.discoverMap(roverState)
    this.printMap(roverState)
  }

  private awaitCommand() {
    window.addEventListener('keydown', async (keyEvent) => {
      const command = Command.fromInput(keyEvent.key)

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
    // process.stdin.on('data', async (key) => {
    //   const command = Command.fromInput(key.toString())
    //
    //   if (command === Command.Exit) {
    //     process.exit()
    //   }
    //
    //   if (command === Command.StartRecording) {
    //     for (const key of ConsoleRenderer.getInstructions()) {
    //       const command = Command.fromInput(key)
    //
    //       const roverState = await this._missionControl.sendCommand(command)
    //       this.printMap(roverState)
    //       await sleep(1000)
    //     }
    //
    //     return
    //   }
    //
    //   const hoverState = await this._missionControl.sendCommand(command)
    //   this.printMap(hoverState)
    // })
  }

  printMap(roverState: any) {
    const grid = this._map.generateMapWithRover(roverState)
    HTMLRenderer.printGrid(grid)
  }
}
