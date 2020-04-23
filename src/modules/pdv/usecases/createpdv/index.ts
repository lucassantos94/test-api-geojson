import { CreatePDV } from './createpdv';
import pdvModel from '../../../../shared/infra/database/mongoose/model/pdv';
import { PDVRepo } from '../../repo/impl/pdv';
import { CreatePDVController } from './createpdvcontroller';

const pdvRepo = new PDVRepo(pdvModel);
const createPDV = new CreatePDV(pdvRepo);
const createPDVController = new CreatePDVController(createPDV);

export { createPDV, createPDVController };
