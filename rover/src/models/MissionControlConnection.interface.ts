export interface IMissionControlConnection {
  listenForCommands(
      onCommandCallback: (
          command: string,
          respondWith: (response: any) => void
      ) => void
  ): void
}
