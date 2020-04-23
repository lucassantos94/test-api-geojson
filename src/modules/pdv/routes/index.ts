import { Router, Request, Response } from 'express';
import { createPDVController } from '../usecases/createpdv';
const router = Router();

router.post('/', (req: Request, res: Response) => createPDVController.executeImpl(req, res));

export default router;
