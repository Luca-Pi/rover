import { Renderable } from "./Renderable"

export class FloorRender extends Renderable {
  forConsole(): string {
    return "■"
  }

  forWeb(): string {
    return "🟫"
  }
}
