export type coordinate = [number, number];

abstract class GeoJson<T> {
  public readonly type: string;
  public readonly coordinates: T;
  constructor(coordinates: T, type: string) {
    this.type = type;
    this.coordinates = coordinates;
  }
}

export class Polygon extends GeoJson<[coordinate[], coordinate[]?]> {
  constructor(coordinates: [coordinate[], coordinate[]?]) {
    super(coordinates, 'Polygon');
  }
}
export class Point extends GeoJson<coordinate> {
  constructor(coordinates: coordinate) {
    super(coordinates, 'Point');
  }
}

export class MultiPolygon extends GeoJson<[coordinate[], coordinate[]?][]> {
  constructor(coordinates: [coordinate[], coordinate[]?][]) {
    super(coordinates, 'MultiPolygon');
  }
}
