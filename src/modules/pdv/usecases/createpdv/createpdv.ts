import { IPDVRepo } from '../../repo/pdv';
import { IUseCase } from '../../../../shared/domain/usecase';
import { PDV } from '../../domain/pdv';
import { Either, fail, success } from '../../../../shared/types/either';

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
export class CreatePDV implements IUseCase<PDVProps, Promise<Either<undefined, PDVProps>>> {
  #pdvRepo: IPDVRepo;
  constructor(repo: IPDVRepo) {
    this.#pdvRepo = repo;
  }

  public async execute(props: PDVProps): Promise<Either<undefined, PDVProps>> {
    const pdvFound = await this.#pdvRepo.getByDocument(props.document);
    const pdvExists = !!pdvFound;
    if (!pdvExists) {
      const { tradingName, ownerName, document } = props;
      const pdv = PDV.Create({
        tradingName,
        ownerName,
        document,
        coverageArea: props.coverageArea.coordinates,
        address: props.address.coordinates,
      });
      if (pdv.isSuccess()) {
        const newPdv = await this.#pdvRepo.create(pdv.value as PDV);
        if (newPdv) {
          const { props, id } = newPdv;
          return success({ ...props, id });
        }
      }
    }
    return fail(undefined);
  }
}
