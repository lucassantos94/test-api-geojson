import { IPDVRepo } from '../../repo/pdv';
import { IUseCase } from '../../../../shared/domain/usecase';
import { PDV } from '../../domain/pdv';
import { Either, fail, success } from '../../../../shared/types/either';

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
export class GetPDVByID implements IUseCase<string, Promise<Either<undefined, PDVProps>>> {
  #pdvRepo: IPDVRepo;
  constructor(repo: IPDVRepo) {
    this.#pdvRepo = repo;
  }

  public async execute(id: string): Promise<Either<undefined, PDVProps>> {
    const pdv = await this.#pdvRepo.getById(id);
    const pdvExists = !!pdv;
    if (pdvExists) {
      const { props, id } = pdv as PDV;
      return success({ ...props, id });
    }
    return fail(undefined);
  }
}
