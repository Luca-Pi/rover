import { container, Lifecycle } from "tsyringe"

import { planetConfig, roverConfig } from "./config"
import {
  ToroidalPlanet,
  Rover,
  RoverControl,
  Point,
  Position
} from "./models"
import { MissionControlConnection } from "./models/MissionControlConnection";

container.register(Rover, {
  useValue: new Rover(
    roverConfig.initialOrientation,
    new Position(
      new Point(roverConfig.initialX, roverConfig.initialY),
      new ToroidalPlanet(planetConfig.size)
    ),
  )
})

container.register(MissionControlConnection,
  { useClass: MissionControlConnection },
  { lifecycle: Lifecycle.Singleton }
)

container.register(RoverControl, {
  useValue: new RoverControl(
    container.resolve(Rover),
    container.resolve(MissionControlConnection),
  )
})
