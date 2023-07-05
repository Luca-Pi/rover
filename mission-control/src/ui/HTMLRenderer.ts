export class HTMLRenderer {

  static initMap(size: number) {
    document.querySelector<HTMLDivElement>('#map')!.style.maxWidth = `${size * 3}ch`
  }

  static printGrid(grid: string) {
    document.querySelector<HTMLDivElement>('#map')!.innerHTML = grid
  }
}
