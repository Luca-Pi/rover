import {Planet} from "./models/Planet"
import {prompt} from "enquirer"
import {planetConfig, roverConfig} from "./config"
import {RoverAction} from "./enums/RoverAction";

const mars = new Planet(planetConfig.size)

mars.landRover(roverConfig.initialX, roverConfig.initialY, roverConfig.initialOrientation)
mars.render()

async function start() {
  while (true) {
    const response = await prompt({
      type: "select",
      name: "action",
      message: "What do you want to do?",
      choices: [
        "moveForward",
        "moveBackward",
        "turnLeft",
        "turnRight",
        "exit",
      ]}) as { action: RoverAction };

    switch (response.action) {
      case RoverAction.MoveForward:
        mars.rover.moveForward()
        break
      case RoverAction.MoveBackward:
        mars.rover.moveBackward()
        break
      case RoverAction.TurnLeft:
        mars.rover.turnLeft()
        break
      case RoverAction.TurnRight:
        mars.rover.turnRight()
        break
      case RoverAction.Exit:
        return
    }

    mars.render()
  }
}

start()
