import "reflect-metadata"
import "./containers"

import { container } from "tsyringe"
import { RoverControl } from "./rover"

const roverControl = container.resolve(RoverControl)

roverControl.listenForCommands()
