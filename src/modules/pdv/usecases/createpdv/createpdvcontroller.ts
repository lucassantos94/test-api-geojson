import { BaseControler } from '../../../../shared/infra/server/model/basecontroller';
import { Request, Response } from 'express';
import { createPDVSchema } from './createpdvschema';
import { IUseCase } from '../../../../shared/domain/usecase';
import { Either } from '../../../../shared/types/either';

interface PDVProps {
  id?: string;
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

export class CreatePDVController extends BaseControler<PDVProps | undefined> {
  #createPDVUseCase: IUseCase<PDVProps, Promise<Either<undefined, PDVProps>>>;
  constructor(createPDVUseCase: IUseCase<PDVProps, Promise<Either<undefined, PDVProps>>>) {
    super();
    this.#createPDVUseCase = createPDVUseCase;
  }

  async exec(req: Request, res: Response): Promise<Response<unknown>> {
    const data = await createPDVSchema.validateAsync(req.body);

    const result = await this.#createPDVUseCase.execute(data);
    if (result.isSuccess()) {
      const pdv = result.value as PDVProps;
      return BaseControler.sendJson(200, res, pdv);
    }
    return BaseControler.badRequest(res);
  }
}
