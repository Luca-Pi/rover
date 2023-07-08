import { planetConfig, ToroidalPlanet } from "lib"
import { container, Lifecycle } from "tsyringe"

import { CollisionDetector, MissionControl } from "./mission-control"
import { HTMLRenderer, ConsoleRenderer, HTMLInterface, ConsoleInterface } from "./ui"
import { IoSocketRoverReceptor } from "./rover-receptor"
import { AppConfig } from "./config"
import { PlanetMap, PlanetMapBuilder } from "./map"

container.register(IoSocketRoverReceptor,
  { useClass: IoSocketRoverReceptor },
  { lifecycle: Lifecycle.Singleton }
)

container.register(ToroidalPlanet, {
  useValue: new ToroidalPlanet(planetConfig.size)
})

container.register(PlanetMap, {
  useValue: new PlanetMapBuilder().WithSize(planetConfig.size).WithRandomObstacles().Build()
})

container.register(CollisionDetector, {
  useValue: new CollisionDetector()
})

container.register(MissionControl, {
  useValue: new MissionControl(
    container.resolve(ToroidalPlanet),
    container.resolve(CollisionDetector),
    container.resolve(PlanetMap),
    container.resolve(IoSocketRoverReceptor)
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
