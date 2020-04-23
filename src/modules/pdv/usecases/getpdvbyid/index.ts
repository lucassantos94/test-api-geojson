import pdvModel from '../../../../shared/infra/database/mongoose/model/pdv';
import { PDVRepo } from '../../repo/impl/pdv';
import { GetPDVByIDController } from './getpdvbyidcontroller';
import { GetPDVByID } from './getpdvbyid';

const pdvRepo = new PDVRepo(pdvModel);
const getPDVByID = new GetPDVByID(pdvRepo);
const getPDVByIDController = new GetPDVByIDController(getPDVByID);

export { getPDVByID, getPDVByIDController };
