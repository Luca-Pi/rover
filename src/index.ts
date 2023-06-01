import {Planet} from "./models/Planet"
import {planetConfig, roverConfig} from "./config"
import {Position} from "./models/Position";
const readline = require('readline-sync')

const mars = new Planet(planetConfig.size)

const stdin = process.stdin;
stdin.setRawMode(true)
stdin.resume();
stdin.setEncoding('utf8')

mars.landRover(
  new Position(roverConfig.initialX, roverConfig.initialY),
  roverConfig.initialOrientation
)
mars.render()
process.stdout.write("use 'z', 's', 'q', 'd' keys to move the rover\n")
process.stdout.write("use 'a' key to define travel\n")
process.stdout.write("use ctrl + c or 'e' key to exit\n")
process.stdout.write(mars.render())


// on any data into stdin
stdin.on('data', function (key) {
  roverCommand(key.toString())
  const grid = mars.render()

  process.stdout.moveCursor(-20, -9)
  process.stdout.write(grid)
})

async function automate() {
  process.stdout.moveCursor(-20, -10)
  process.stdout.clearScreenDown()
  process.stdout.moveCursor(0, 10)

  const instructions = readline.question(`Enter your instructions: `) as string
  process.stdout.clearLine(0)
  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    roverCommand(instruction)
    await sleep(250)
  }
}

function roverCommand(command: string) {
  switch (command) {
    case "z":
      mars.rover.moveForward()
      break
    case "s":
      mars.rover.moveBackward()
      break
    case "q":
      mars.rover.turnLeft()
      break
    case "d":
      mars.rover.turnRight()
      break
    case "a":
      automate()
      break
    case "e":
    case "\u0003":
      process.exit()
      break
  }

  const grid = mars.render()

  process.stdout.moveCursor(-20, -9)
  process.stdout.write(grid)
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
