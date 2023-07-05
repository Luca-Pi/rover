import { Point } from "../models";

export interface SystemCoordinates {
  standardize(position: Point): Point
}
