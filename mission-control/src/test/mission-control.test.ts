import { MissionControlBuilder } from "./utils"
import { Orientation } from "lib"
import { Command } from "../enums"
import { describe, it, expect } from "vitest"

describe('FEATURE Mission control command', () => {
    it.each([
      [ Command.Up.toString(), 1,2 ],
      [ Command.Down.toString(), 3,2 ],
      [ Command.Right.toString(), 4,2 ],
      [ Command.Left.toString(), 8,2 ],
      [ Command.GoBack.toString(), 9,2 ],
    ])('Given a command %s ' +
      'when it the mission control send the command' +
      'then the rover position should be x:%s, y:%s', async (givenCommand: string, expectedX: number, expectedY: number) => {
      const command = Command.fromString(givenCommand)
      let missionControl = new MissionControlBuilder()
        .AwaitRoverStateForCommand(command, { position: { x: expectedX, y: expectedY }, orientation: Orientation.North })
        .Build()

      const expectedRoverState = await missionControl.sendCommand(command)

      expect(expectedRoverState.position.x).toEqual(expectedX)
      expect(expectedRoverState.position.y).toEqual(expectedY)
    })
})

describe('FEATURE Mission control collision detection', () => {
  it.each([
    [ 1,2 ],
    [ 3,2 ],
    [ 4,2 ],
    [ 8,2 ],
    [ 9,2 ],
  ])('Given an obstacle at position %s,%s ' +
    'when it the mission control send the command' +
    'then the rover position should not move', async (expectedX: number, expectedY: number) => {
    let missionControl = new MissionControlBuilder()
      .AwaitRoverStateForCommand(Command.Up, { position: { x: expectedX, y: expectedY - 1 }, orientation: Orientation.North })
      .AwaitRoverStateForCommand(Command.GoBack, { position: { x: expectedX, y: expectedY }, orientation: Orientation.North })
      .Build()

    const expectedRoverState = await missionControl.sendCommand(Command.Up)
    const roverStateAfterCollision = await missionControl.detectCollision(expectedRoverState)

    expect(roverStateAfterCollision.position.x).toEqual(expectedRoverState.position.x)
  })
})