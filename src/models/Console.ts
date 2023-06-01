import readline from "readline-sync"
import { planetConfig } from "../config"

export class Console {

  static Init() {
    process.stdin.setRawMode(true)
    process.stdin.resume();
    process.stdin.setEncoding('utf8')
  }

  static clearScreen() {
    process.stdout.clearScreenDown()
  }

  static printGrid(grid: string, overwrite: boolean = true) {
    if (overwrite) {
      Console.moveTo(-99, -planetConfig.size + 1)
    }

    process.stdout.write(grid)
  }

  static moveTo(x: number, y: number) {
    process.stdout.moveCursor(x, y)
  }

  static getInstructions(): string[] {
    Console.moveTo(-99, -planetConfig.size + 1)
    Console.clearScreen()
    Console.moveTo(0, planetConfig.size + 1)

    const instructions = readline.question(`Enter your instructions: `) as string
    process.stdout.clearLine(0)
    return instructions.split("")
  }
}
