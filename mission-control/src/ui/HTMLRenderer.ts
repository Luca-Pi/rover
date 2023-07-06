import { Renderable } from "./renders"

export class HTMLRenderer {
  initMap(size: number) {
    document.querySelector<HTMLDivElement>(':root')!.style.setProperty('--planet-size', size.toString())
  }

  /** wrap all entity with span and return it as a single string */
  getGridFromMap(map: Renderable[][]) {
    return map.map((row) => {
      return row.map((entity) => `<span>${entity.forWeb()}</span>`).join("")
    }).join("")
  }

  printGrid(grid: string) {
    document.querySelector<HTMLDivElement>('#map')!.innerHTML = grid
  }
}
