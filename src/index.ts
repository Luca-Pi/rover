import {Planet} from "./models/Planet"
import {planetConfig, roverConfig} from "./config"
import {Position} from "./models/Position"
import {Command} from "./models/Command"
import {Console} from "./models/Console";

const mars = new Planet(planetConfig.size)

Console.Init()

mars.landRover(
  new Position(roverConfig.initialX, roverConfig.initialY),
  roverConfig.initialOrientation
)

process.stdout.write("use 'z', 's', 'q', 'd' keys to move the rover\n")
process.stdout.write("use 'a' key to define travel\n")
process.stdout.write("use ctrl + c or 'e' key to exit\n")
mars.render(false)

process.stdin.on('data', function (key) {
  const keyInput = key.toString()

  if(Command.FromInput(keyInput) === Command.Exit) {
    process.exit()
  }

  mars.rover.command(keyInput)
  mars.render()
})

