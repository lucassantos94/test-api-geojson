import { PDV } from '../domain/pdv';
import { MultiPolygon, Point } from '../domain/geojson';

export interface PDVProps {
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: MultiPolygon;
  addres: Point;
}
export interface IPDVRepo {
  getById(id: string): Promise<PDV | undefined>;
  create(pdv: PDV): Promise<PDV>;
  getAllNearestByLocation(point: [number, number]): Promise<PDV | undefined>;
  getByDocument(document: string): Promise<PDV | undefined>;
}
