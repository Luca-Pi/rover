import { container, Lifecycle } from "tsyringe"

import { planetConfig } from "./config"
import { CollisionDetector, MissionControl, PlanetMap, ToroidalPlanet, } from "./models"
import { RoverConnector } from "./models/RoverConnector.ts";
import { ConsoleInterface } from "./ui/ConsoleInterface";
import { HTMLInterface } from "./ui/HTMLInterface.ts";

container.register(RoverConnector,
  { useClass: RoverConnector },
  { lifecycle: Lifecycle.Singleton }
)

container.register(ToroidalPlanet, {
  useValue: new ToroidalPlanet(planetConfig.size)
})

container.register(PlanetMap, {
  useValue: new PlanetMap(
    container.resolve(ToroidalPlanet).size,
  )
})

container.register(CollisionDetector, {
  useValue: new CollisionDetector()
})

container.register(MissionControl, {
  useValue: new MissionControl(
    container.resolve(ToroidalPlanet),
    container.resolve(CollisionDetector),
    container.resolve(PlanetMap),
    container.resolve(RoverConnector)
  )
})

const withConsole = false

container.register<HTMLInterface | ConsoleInterface>("UiInterface", {
  useValue: withConsole
    ? new ConsoleInterface(
      container.resolve(MissionControl),
      container.resolve(PlanetMap),
    ) :
    new HTMLInterface(
      container.resolve(MissionControl),
      container.resolve(PlanetMap),
    )
})
