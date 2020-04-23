import { Request, Response } from 'express';
export abstract class BaseControler<T> {
  abstract exec(req: Request, res: Response): Promise<Response<T>>;

  public async executeImpl(req: Request, res: Response): Promise<void> {
    try {
      await this.exec(req, res);
    } catch (error) {
      // console.error(error);
      if (error.isJoi) {
        BaseControler.badRequest(res);
      } else {
        console.error(error);
        res.status(500).send();
      }
    }
  }

  public static OK<T>(res: Response): Response<T> {
    return res.status(200).send();
  }

  public static sendJson<T, U>(status: number, res: Response, data?: U): Response<T> {
    return res.status(status).send({ data });
  }

  public static noContent<T>(res: Response): Response<T> {
    return res.status(204).send();
  }

  public static badRequest<T>(res: Response): Response<T> {
    return res.status(400).send();
  }

  public static Unathorized<T>(res: Response): Response<T> {
    return res.status(401).send();
  }
}
