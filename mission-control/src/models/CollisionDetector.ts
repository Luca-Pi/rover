import { PlanetMap } from "./PlanetMap"
import {Position} from "lib";

export class CollisionDetector {
  isEntityOnObstacle(planetMap: PlanetMap, entityPosition: Position): boolean {
    return planetMap.getEntityAtPosition(entityPosition).hasCollision
  }
}
