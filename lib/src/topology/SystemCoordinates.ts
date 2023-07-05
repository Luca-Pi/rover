import { Point } from "../geometry"

export interface SystemCoordinates {
  standardize(position: Point): Point
}
