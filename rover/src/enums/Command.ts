export type CommandName = "Up" | "Down" | "Right" | "Left" | "GoBack" | "Land" | "Invalid"

export class Command {
  static Up: Command = new Command("Up")
  static Down: Command = new Command("Down")
  static Right: Command = new Command("Right")
  static Left: Command = new Command("Left")
  static GoBack: Command = new Command("GoBack")
  static Land: Command = new Command("Land")

  static Invalid: Command = new Command("Invalid")

  private readonly _representation: string

  private constructor(public readonly commandName: CommandName) {
    this._representation = commandName
  }

  static fromString(input: string): Command {
    switch (input) {
      case "Up":
        return Command.Up
      case "Down":
        return Command.Down
      case "Right":
        return Command.Right
      case "Left":
        return Command.Left
      case "GoBack":
        return Command.GoBack
      case "Land":
        return Command.Land
      default:
        return Command.Invalid
    }
  }
}
