export abstract class Renderable {
  abstract forConsole(): string
  abstract forWeb(): string
}
