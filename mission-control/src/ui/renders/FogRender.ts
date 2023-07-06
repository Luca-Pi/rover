import { Renderable} from "./Renderable"

export class FogRender extends Renderable {
  forConsole(): string {
    return "~"
  }

  forWeb(): string {
    return "🌫️"
  }
}
