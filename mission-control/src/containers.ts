import { planetConfig, ToroidalPlanet } from "lib"
import { container, Lifecycle } from "tsyringe"

import { CollisionDetector, MissionControl, PlanetMap } from "./models"
import { HTMLRenderer, ConsoleRenderer, HTMLInterface, ConsoleInterface } from "./ui"
import { IoRoverConnector } from "./rover-connector"
import { AppConfig } from "./config"

container.register(IoRoverConnector,
  { useClass: IoRoverConnector },
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
    container.resolve(IoRoverConnector)
  )
})

container.register<HTMLInterface | ConsoleInterface>("UiInterface", {
  useValue: AppConfig.isConsoleMode
    ? new ConsoleInterface(
      container.resolve(MissionControl),
      container.resolve(PlanetMap),
      new ConsoleRenderer()
    )
    : new HTMLInterface(
      container.resolve(MissionControl),
      container.resolve(PlanetMap),
      new HTMLRenderer()
    )
})
