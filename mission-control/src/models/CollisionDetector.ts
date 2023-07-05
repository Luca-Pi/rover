import { Position } from "./geometry"
import { PlanetMap } from "./PlanetMap"

export class CollisionDetector {
  isEntityOnObstacle(planetMap: PlanetMap, entityPosition: Position): boolean {
    return planetMap.getEntityAtPosition(entityPosition).hasCollision
  }
}
