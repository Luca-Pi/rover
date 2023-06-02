import { planetConfig, roverConfig } from "./config"
import { Position, Point } from "./models/geometry"
import { CommandControl } from "./models/CommandControl"
import { Rover } from "./models/entity"
import { ToroidalPlanet } from "./models/ToroidalPlanet"

const rover = new Rover(roverConfig.initialOrientation,
  new Position(
    new Point(roverConfig.initialX, roverConfig.initialY),
    new ToroidalPlanet(planetConfig.size)
  ),
)

const mars = new ToroidalPlanet(planetConfig.size)
const commandControl = new CommandControl(mars, rover)

commandControl.initializeControls()
