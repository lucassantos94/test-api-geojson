import { Request, Response } from 'express';
export abstract class BaseControler {
  abstract exec(req: Request, res: Response): Promise<Response<unknown>>;

  public async executeImpl(req: Request, res: Response): Promise<void> {
    try {
      await this.exec(req, res);
    } catch (error) {
      //  console.error(error);
      if (error.isJoi) {
        BaseControler.badRequest(res);
      } else {
        console.error(error);
        res.status(500).send();
      }
    }
  }

  public static OK(res: Response): Response<unknown> {
    return res.status(200).send();
  }

  public static sendJson(status: number, res: Response, data?: unknown): Response<unknown> {
    return res.status(status).send({ data });
  }

  public static noContent(res: Response): Response<unknown> {
    return res.status(201).send();
  }

  public static badRequest(res: Response): Response<unknown> {
    return res.status(400).send();
  }

  public static Unathorized(res: Response): Response<unknown> {
    return res.status(401).send();
  }
}
