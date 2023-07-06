import { planetConfig } from "lib"
import { Renderable } from "./renders"

export class ConsoleRenderer {

  init() {
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    process.stdout.write("use 'z', 's', 'q', 'd' keys to move the rover\n")
    process.stdout.write("use 'a' key to define travel\n")
    process.stdout.write("use ctrl + c or 'e' key to exit\n")
  }

  private clearScreen() {
    process.stdout.clearScreenDown()
  }

  getGridFromMap(map: Renderable[][]) {
    return map.map((row) => {
      return row.map((entity) => entity.forConsole()).join(" ")
    }).join("\n")
  }

  printGrid(map: Renderable[][], overwrite: boolean = true) {
    if (overwrite) {
      this.moveTo(-99, -planetConfig.size + 1)
    }

    const grid = this.getGridFromMap(map)

    process.stdout.write(grid)
  }

  private moveTo(x: number, y: number) {
    process.stdout.moveCursor(x, y)
  }

  getInstructions(): string[] {
    this.moveTo(-99, -planetConfig.size + 1)
    this.clearScreen()
    this.moveTo(0, planetConfig.size + 1)

    // const instructions = readline.question(`Enter your instructions: (z,q,s,d)`)

    process.stdout.clearLine(0)
    // return instructions.split("")
    return []
  }
}
