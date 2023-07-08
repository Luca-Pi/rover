import { Point } from "../geometry"

export interface Planet {
  standardize(position: Point): Point
}
