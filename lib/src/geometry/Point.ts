export class Point {
  constructor(public readonly x: number, public readonly y: number) {}

  public modulo(modulo: number) {
    return new Point(this.x % modulo, this.y % modulo)
  }

  public IncrementX() : Point {
    return new Point(this.x + 1, this.y);
  }

  public DecrementX() : Point {
    return new Point(this.x - 1, this.y);
  }

  public IncrementY() : Point {
    return new Point(this.x, this.y + 1);
  }

  public DecrementY() : Point {
    return new Point(this.x, this.y - 1);
  }

  public add(other: Point) : Point {
    return new Point(this.x + other.x, this.y + other.y);
  }

  public isSamePoint(point: Point) : boolean {
    return this.x === point.x && this.y === point.y
  }
}
