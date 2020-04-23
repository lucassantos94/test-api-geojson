import { Router, Request, Response } from 'express';
import pdvRouter from '../../../../modules/pdv/routes';

const router = Router();

router.use('/pdv', pdvRouter);
export default router;
