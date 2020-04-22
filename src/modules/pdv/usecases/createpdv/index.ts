import { CreatePDV } from './createpdv';
import pdvModel from '../../../../shared/infra/database/mongoose/model/pdv';
import { PDVRepo } from '../../repo/impl/pdv';

const pdvRepo = new PDVRepo(pdvModel);
export const createPDV = new CreatePDV(pdvRepo);
