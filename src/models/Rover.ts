import {Orientation} from "../enums/Orientation"
import {Entity} from "./Entity"
import {Position} from "./Position"
import {roverConfig} from "../config"
import {Planet} from "./Planet"
import {Obstacle} from "./Obstacle";

export class Rover extends Entity {
    constructor(
        public position: Position,
        public orientation: Orientation,
        private planet: Planet
    ) {
        super()
    }

    moveForward() {
        const lastPosition = this.position
        switch (this.orientation) {
            case Orientation.North:
                this.position = this.position.decrementYFromPlanet(this.planet.size)
                break
            case Orientation.East:
                this.position = this.position.incrementXFromPlanet(this.planet.size)
                break
            case Orientation.South:
                this.position = this.position.incrementYFromPlanet(this.planet.size)
                break
            case Orientation.West:
                this.position = this.position.decrementXFromPlanet(this.planet.size)
                break
        }
        if (this.isOnObstacle(this.position)) {
            this.position = lastPosition
        }
    }

    moveBackward() {
        const lastPosition = this.position

        switch (this.orientation) {
            case Orientation.North:
                this.position = this.position.incrementYFromPlanet(this.planet.size)
                break
            case Orientation.East:
                this.position = this.position.decrementXFromPlanet(this.planet.size)
                break
            case Orientation.South:
                this.position = this.position.decrementYFromPlanet(this.planet.size)
                break
            case Orientation.West:
                this.position = this.position.incrementXFromPlanet(this.planet.size)
                break
        }

        if (this.isOnObstacle(this.position)) {
            this.position = lastPosition
        }
    }

    turnLeft() {
        switch (this.orientation) {
            case Orientation.North:
                this.orientation = Orientation.West
                break
            case Orientation.West:
                this.orientation = Orientation.South
                break
            case Orientation.East:
                this.orientation = Orientation.North
                break
            case Orientation.South:
                this.orientation = Orientation.East
                break
        }
    }

    turnRight() {
        switch (this.orientation) {
            case "N":
                this.orientation = Orientation.East
                break
            case "E":
                this.orientation = Orientation.South
                break
            case "W":
                this.orientation = Orientation.North
                break
            case "S":
                this.orientation = Orientation.West
                break
        }
    }

    shape(roverOrientation: Orientation): string {
        return roverConfig.render[roverOrientation]
    }

    isOnObstacle(position: Position): boolean {
        const entity = this.planet.getEntityAtPosition(position)
        return entity instanceof Obstacle
    }
}
