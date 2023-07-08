import { Command } from "../enums"
import { MissionControl } from "../mission-control"
import { HTMLRenderer } from "./HTMLRenderer"
import { RoverState } from "../rover-receptor"
import { Point } from "lib"
import { PlanetMap } from "../map"

export class HTMLInterface {
  constructor(
    private _missionControl: MissionControl,
    private _map: PlanetMap,
    private _renderer: HTMLRenderer
  ) {
    this.initInterface()
    this.awaitCommand()
  }

  private async initInterface() {
    this._renderer.initMap(this._map.size)
    const roverState = await this._missionControl.landRover()
    this._map.discoverMapOnPosition(new Point(roverState.position.x, roverState.position.y))
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
