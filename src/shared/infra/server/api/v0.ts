import { Router, Request, Response } from 'express';

const router = Router();

router.get('/home', (req: Request, res: Response) => {
  return res.status(200).send('hello World');
});
export default router;
