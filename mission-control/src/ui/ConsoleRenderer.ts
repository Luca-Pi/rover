import { planetConfig } from "../config"

export class ConsoleRenderer {

  static Init() {
    process.stdin.setRawMode(true)
    process.stdin.resume();
    process.stdin.setEncoding('utf8')

    process.stdout.write("use 'z', 's', 'q', 'd' keys to move the rover\n")
    process.stdout.write("use 'a' key to define travel\n")
    process.stdout.write("use ctrl + c or 'e' key to exit\n")
  }

  static clearScreen() {
    process.stdout.clearScreenDown()
  }

  static printGrid(grid: string, overwrite: boolean = true) {
    if (overwrite) {
      ConsoleRenderer.moveTo(-99, -planetConfig.size + 1)
    }

    process.stdout.write(grid)
  }

  static moveTo(x: number, y: number) {
    process.stdout.moveCursor(x, y)
  }

  static getInstructions(): string[] {
    ConsoleRenderer.moveTo(-99, -planetConfig.size + 1)
    ConsoleRenderer.clearScreen()
    ConsoleRenderer.moveTo(0, planetConfig.size + 1)

    // const instructions = readline.question(`Enter your instructions: (z,q,s,d)`)

    process.stdout.clearLine(0)
    // return instructions.split("")
    return []
  }
}
