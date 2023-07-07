export interface IRoverEmitter {
  listenForCommands(
      onCommandCallback: (
          command: string,
          respondWith: (response: any) => void
      ) => void
  ): void
}
