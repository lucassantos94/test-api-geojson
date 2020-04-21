import { v4 as uuid } from 'uuid';
import { MultiPolygon, Point, coordinate } from './geojson';
import { Either, fail, success } from '../../../shared/types/either';
interface PDVProps {
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: MultiPolygon;
  addres: Point;
}

export class PDV {
  public readonly id: string;
  #props: PDVProps;

  private constructor(props: PDVProps, id: string) {
    this.#props = props;
    this.id = id;
  }

  public static Create(
    {
      tradingName,
      ownerName,
      document,
      coverageArea,
      address,
    }: {
      tradingName: string;
      ownerName: string;
      document: string;
      coverageArea: [coordinate[], coordinate[]?][];
      address: coordinate;
    },
    id?: string,
  ): Either<string, PDV> {
    try {
      const isNew = !!id;
      const validId = isNew ? (id as string) : uuid();
      const validCoverage = new MultiPolygon(coverageArea);
      const validAddress = new Point(address);
      return success(
        new PDV(
          {
            coverageArea: validCoverage,
            addres: validAddress,
            document,
            ownerName,
            tradingName,
          },
          validId,
        ),
      );
    } catch (error) {
      return fail('invalid PDV');
    }
  }
}
