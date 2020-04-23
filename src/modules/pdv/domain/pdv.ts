import { v4 as uuid } from 'uuid';
import { MultiPolygon, Point } from './geojson';
import { Either, fail, success } from '../../../shared/types/either';
interface PDVProps {
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: MultiPolygon;
  address: Point;
}

export class PDV {
  public readonly id: string;
  #props: PDVProps;

  private constructor(props: PDVProps, id: string) {
    this.#props = props;
    this.id = id;
  }

  public get props(): {
    tradingName: string;
    ownerName: string;
    document: string;
    coverageArea: {
      type: string;
      coordinates: number[][][][];
    };
    address: {
      type: string;
      coordinates: number[];
    };
  } {
    return {
      tradingName: this.tradingName,
      ownerName: this.ownerName,
      document: this.document,
      coverageArea: this.coverageArea,
      address: this.address,
    };
  }

  public get tradingName(): string {
    return this.#props.tradingName;
  }

  public get ownerName(): string {
    return this.#props.ownerName;
  }

  public get document(): string {
    return this.#props.document;
  }

  public get coverageArea(): {
    type: string;
    coordinates: number[][][][];
  } {
    return this.#props.coverageArea.props;
  }

  public get address(): {
    type: string;
    coordinates: number[];
  } {
    return this.#props.address;
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
      coverageArea: number[][][][];
      address: number[];
    },
    id?: string,
  ): Either<string, PDV> {
    try {
      const isNew = !!id === false;
      const validId = isNew ? uuid() : (id as string);
      const validCoverage = new MultiPolygon(coverageArea);
      const validAddress = new Point(address);
      return success(
        new PDV(
          {
            coverageArea: validCoverage,
            address: validAddress,
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
