export type coordinate = number[];

abstract class GeoJson<T> {
  public readonly type: string;
  public readonly coordinates: T;
  constructor(coordinates: T, type: string) {
    this.type = type;
    this.coordinates = coordinates;
  }

  get props(): { type: string; coordinates: T } {
    return { type: this.type, coordinates: this.coordinates };
  }
}

export class Polygon extends GeoJson<coordinate[][]> {
  constructor(coordinates: coordinate[][]) {
    super(coordinates, 'Polygon');
  }
}
export class Point extends GeoJson<coordinate> {
  constructor(coordinates: coordinate) {
    super(coordinates, 'Point');
  }
}

export class MultiPolygon extends GeoJson<coordinate[][][]> {
  constructor(coordinates: coordinate[][][]) {
    super(coordinates, 'MultiPolygon');
  }
}
