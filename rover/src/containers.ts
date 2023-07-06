import { container, Lifecycle } from "tsyringe"
import { Position, Point, ToroidalPlanet, roverConfig, planetConfig } from "lib"

import {
  Rover,
  RoverControl,
} from "./models"
import { IoMissionControlConnection } from "./models/IoMissionControlConnection"

container.register(Rover, {
  useValue: new Rover(
    roverConfig.initialOrientation,
    new Position(
      new Point(roverConfig.initialX, roverConfig.initialY),
      new ToroidalPlanet(planetConfig.size)
    ),
  )
})

container.register(IoMissionControlConnection,
  { useClass: IoMissionControlConnection },
  { lifecycle: Lifecycle.Singleton }
)

container.register(RoverControl, {
  useValue: new RoverControl(
    container.resolve(Rover),
    container.resolve(IoMissionControlConnection),
  )
})
