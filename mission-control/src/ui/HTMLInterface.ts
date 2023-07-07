import { Command } from "../enums"
import { MissionControl, PlanetMap } from "../mission-control"
import { HTMLRenderer } from "./HTMLRenderer"
import { RoverState } from "../rover-receptor"

export class HTMLInterface {
  constructor(
    private _missionControl: MissionControl,
    private _map: PlanetMap,
    private _renderer: HTMLRenderer
  ) {
    this.initMap()
    this.awaitCommand()
  }

  private async initMap() {
    this._renderer.initMap(this._map.size)
    const roverState = await this._missionControl.landRover()
    this._map.discoverMap(roverState)
    this.printMap(roverState)
  }

  private awaitCommand() {
    window.addEventListener('keydown', async (keyEvent) => {
      const command = Command.fromInput(keyEvent.key)

      const hoverState = await this._missionControl.sendCommand(command)
      this.printMap(hoverState)
    })
  }

  printMap(roverState: RoverState) {
    const map = this._map.generateMapWithRover(roverState)

    this._renderer.printGrid(this._renderer.getGridFromMap(map))
  }
}
