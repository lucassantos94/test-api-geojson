import { Router, Request, Response } from 'express';
import { createPDVController } from '../usecases/createpdv';
import { getPDVByIDController } from '../usecases/getpdvbyid';
import { getNearestPDVController } from '../usecases/getnearestpdv';
const router = Router();

router
  .post('/', (req: Request, res: Response) => createPDVController.executeImpl(req, res))
  .get('/:id', (req: Request, res: Response) => getPDVByIDController.executeImpl(req, res))
  .get('/near/:lat/:long', (req: Request, res: Response) => getNearestPDVController.executeImpl(req, res));

export default router;
