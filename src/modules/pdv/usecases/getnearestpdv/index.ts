import pdvModel from '../../../../shared/infra/database/mongoose/model/pdv';
import { PDVRepo } from '../../repo/impl/pdv';
import { GetNearestPDVController } from './getnearestpdvcontroller';
import { GetNearestPDV } from './getnearestpdv';

const pdvRepo = new PDVRepo(pdvModel);
const getNearestPDV = new GetNearestPDV(pdvRepo);
const getNearestPDVController = new GetNearestPDVController(getNearestPDV);

export { getNearestPDV, getNearestPDVController };
