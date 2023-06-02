import { Command } from "../enums"
import { sleep } from "../utils/sleep"
import { Rover, Obstacle } from "./entity"
import { Console } from "./Console"
import { ToroidalPlanet } from "./ToroidalPlanet"
import { RoverState } from "./RoverState"
import { PlanetMap } from "./PlanetMap"

export class CommandControl {
  private map: PlanetMap

  constructor(private planet: ToroidalPlanet, private rover: Rover) {
    this.map = new PlanetMap(this.rover, this.planet.size)
  }

  command(command: string) {
    const roverLastState = this.rover.state
    let roverNewState: RoverState | undefined = undefined

    switch (Command.fromInput(command)) {
      case Command.Up:
        roverNewState = this.rover.moveForward()
        break
      case Command.Down:
        roverNewState = this.rover.moveBackward()
        break
      case Command.Left:
        roverNewState = this.rover.turnLeft()
        break
      case Command.Right:
        roverNewState = this.rover.turnRight()
        break
      case Command.StartRecording:
        this.queueCommands()
        break
      default:
        // do nothing
        break
    }

    if (roverNewState !== undefined && this.isRoverOnObstacle(this.planet, roverNewState)) {
      this.rover.goTo(roverLastState)
    }
  }

  private async queueCommands() {
    const instructions = Console.getInstructions()

    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i]
      this.command(instruction)
      await sleep(250)
      this.map.render()
    }
  }

  initializeControls() {
    Console.Init()

    process.stdout.write("use 'z', 's', 'q', 'd' keys to move the rover\n")
    process.stdout.write("use 'a' key to define travel\n")
    process.stdout.write("use ctrl + c or 'e' key to exit\n")
    this.map.render(false)

    process.stdin.on('data', (key) => {
      const keyInput = key.toString()

      if (Command.fromInput(keyInput) === Command.Exit) {
        process.exit()
      }

      this.command(keyInput)
      this.map.render()
    })
  }

  isRoverOnObstacle(planet: ToroidalPlanet, roverState: RoverState): boolean {
    const entity = this.map.getEntityAtPosition(roverState.position)
    return entity instanceof Obstacle
  }
}
