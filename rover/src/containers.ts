import { container, Lifecycle } from "tsyringe"
import { Position, Point, ToroidalPlanet, roverConfig, planetConfig } from "lib"

import { SocketIoRoverEmitter } from "./rover-emmiter"
import { Rover, RoverControl } from "./rover"

container.register(Rover, {
  useValue: new Rover(
    roverConfig.initialOrientation,
    new Position(
      new Point(roverConfig.initialX, roverConfig.initialY),
      new ToroidalPlanet(planetConfig.size)
    ),
  )
})

container.register(SocketIoRoverEmitter,
  { useClass: SocketIoRoverEmitter },
  { lifecycle: Lifecycle.Singleton }
)

container.register(RoverControl, {
  useValue: new RoverControl(
    container.resolve(Rover),
    container.resolve(SocketIoRoverEmitter),
  )
})
