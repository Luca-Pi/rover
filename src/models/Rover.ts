import {Orientation} from "../enums/Orientation"

export class Rover {
    constructor(
        public x: number,
        public y: number,
        public orientation: Orientation,
        private planetSize: number
    ) { }

    moveForward() {
        switch (this.orientation) {
            case Orientation.North:
                this.y = (this.y + 1 + this.planetSize) % this.planetSize
                break
            case Orientation.East:
                this.x = (this.x + 1 + this.planetSize) % this.planetSize
                break
            case Orientation.South:
                this.y = (this.y - 1 + this.planetSize) % this.planetSize
                break
            case Orientation.West:
                this.x = (this.x - 1 + this.planetSize) % this.planetSize
                break
        }
    }

    moveBackward() {
        switch (this.orientation) {
            case Orientation.North:
                this.y = (this.y - 1 + this.planetSize) % this.planetSize
                break
            case Orientation.East:
                this.x = (this.x - 1 + this.planetSize) % this.planetSize
                break
            case Orientation.South:
                this.y = (this.y + 1 + this.planetSize) % this.planetSize
                break
            case Orientation.West:
                this.x = (this.x + 1 + this.planetSize) % this.planetSize
                break
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
}
