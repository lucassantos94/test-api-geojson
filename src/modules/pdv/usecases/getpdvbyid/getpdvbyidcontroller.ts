import { BaseControler } from '../../../../shared/infra/server/model/basecontroller';
import { Request, Response } from 'express';
import { IUseCase } from '../../../../shared/domain/usecase';
import { Either } from '../../../../shared/types/either';
import { getPDVByIDSchema } from './getpdvbyidschema';

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

export class GetPDVByIDController extends BaseControler<PDVProps | undefined> {
  #getPDVByIdUseCase: IUseCase<string, Promise<Either<undefined, PDVProps>>>;
  constructor(getPDVByIdUseCase: IUseCase<string, Promise<Either<undefined, PDVProps>>>) {
    super();
    this.#getPDVByIdUseCase = getPDVByIdUseCase;
  }

  async exec(req: Request, res: Response): Promise<Response<unknown>> {
    const id = await getPDVByIDSchema.validateAsync(req.params.id);

    const result = await this.#getPDVByIdUseCase.execute(id);
    if (result.isSuccess()) {
      const pdv = result.value as PDVProps;
      return BaseControler.sendJson(200, res, pdv);
    }
    return BaseControler.noContent(res);
  }
}
