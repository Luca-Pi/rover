import {Position} from "./Position"
import {Orientation} from "../enums/Orientation"

export abstract class Entity {
  public abstract position: Position

  abstract shape(roverOrientation?: Orientation): string
}
