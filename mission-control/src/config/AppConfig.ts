export class AppConfig {
  static get isConsoleMode() {
    return import.meta.env.MODE === "console"
  }
}
