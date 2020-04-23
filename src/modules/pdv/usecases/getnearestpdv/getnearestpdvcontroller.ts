import { BaseControler } from '../../../../shared/infra/server/model/basecontroller';
import { Request, Response } from 'express';
import { IUseCase } from '../../../../shared/domain/usecase';
import { Either } from '../../../../shared/types/either';
import { getNearestPDVSchema } from './getnearestpdvschema';

interface PDVProps {
  id: string;
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
}

export class GetNearestPDVController extends BaseControler<PDVProps | undefined> {
  #getNearestPDVUseCase: IUseCase<[number, number], Promise<Either<undefined, PDVProps>>>;
  constructor(getNearestPDVUseCase: IUseCase<[number, number], Promise<Either<undefined, PDVProps>>>) {
    super();
    this.#getNearestPDVUseCase = getNearestPDVUseCase;
  }

  async exec(req: Request, res: Response): Promise<Response<unknown>> {
    const { lat, long } = await getNearestPDVSchema.validateAsync(req.params);
    const result = await this.#getNearestPDVUseCase.execute([lat, long]);
    if (result.isSuccess()) {
      const pdv = result.value;
      return BaseControler.sendJson(200, res, pdv);
    }
    return BaseControler.noContent(res);
  }
}
