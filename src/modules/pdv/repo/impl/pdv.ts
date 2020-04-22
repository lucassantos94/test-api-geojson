/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPDVRepo, PDVProps } from '../pdv';
import { PDV } from '../../domain/pdv';
import pdv, { IPDVModel } from '../../../../shared/infra/database/mongoose/model/pdv';
import { Model } from 'mongoose';

export class PDVRepo implements IPDVRepo {
  #model: Model<IPDVModel>;
  constructor(model: Model<IPDVModel>) {
    this.#model = model;
  }

  private toDomain(pdvModel: IPDVModel): PDV | undefined {
    const createPDV = PDV.Create({
      tradingName: pdvModel.tradingName,
      ownerName: pdvModel.ownerName,
      document: pdvModel.document,
      coverageArea: pdvModel.coverageArea.coordinates,
      address: pdvModel.address.coordinates,
    });
    if (createPDV.isSuccess()) return createPDV.value as PDV;
  }

  async getByDocument(document: string): Promise<PDV | undefined> {
    let pdv: PDV | undefined;
    const retrievedPDV = await this.#model.findOne({ document }, { lean: true });
    if (retrievedPDV) {
      pdv = this.toDomain(retrievedPDV);
    }

    return pdv;
  }

  public async getById(id: string): Promise<PDV | undefined> {
    throw new Error('Method not implemented.');
  }

  public async create(pdv: PDV): Promise<PDV> {
    const { props } = pdv;
    await this.#model.create({
      ...props,
      id: pdv.id,
    });
    return pdv;
  }
}
