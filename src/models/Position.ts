export class Position {
    constructor(public x: number, public y: number) { }

    incrementXFromPlanet(planetSize: number) : Position {
        const x = (this.x + 1 + planetSize) % planetSize
        return new Position(x, this.y);
    }

    decrementXFromPlanet(planetSize: number) : Position {
        const x = (this.x - 1 + planetSize) % planetSize
        return new Position(x, this.y);
    }

    incrementYFromPlanet(planetSize: number) : Position {
        const y = (this.y + 1 + planetSize) % planetSize
        return new Position(this.x, y);
    }

    decrementYFromPlanet(planetSize: number) : Position {
        const y = (this.y - 1 + planetSize) % planetSize
        return new Position(this.x, y);
    }

    isSamePosition(position: Position) : boolean {
        return this.x === position.x && this.y === position.y
    }
}
