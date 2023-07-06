import { Renderable } from "./Renderable"

export class RockRender extends Renderable {
  forConsole(): string {
    return "o"
  }

  forWeb(): string {
    return "🪨"
  }
}
