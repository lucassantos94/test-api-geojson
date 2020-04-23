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
    const createPDV = PDV.Create(
      {
        tradingName: pdvModel.tradingName,
        ownerName: pdvModel.ownerName,
        document: pdvModel.document,
        coverageArea: pdvModel.coverageArea.coordinates,
        address: pdvModel.address.coordinates,
      },
      pdvModel.id,
    );
    if (createPDV.isSuccess()) return createPDV.value as PDV;
  }

  async getByDocument(document: string): Promise<PDV | undefined> {
    let pdv: PDV | undefined;
    const retrievedPDV = await this.#model.findOne({ document }, null, { lean: true });
    if (retrievedPDV) {
      pdv = this.toDomain(retrievedPDV);
    }

    return pdv;
  }

  async getAllNearestByLocation(point: [number, number]): Promise<PDV | undefined> {
    let pdv: PDV | undefined;
    try {
      const nearestPDV = await this.#model
        .find()
        .where('address')
        .near({ center: point, maxDistance: 50000, spherical: true })
        .findOne()
        .where('coverageArea')
        .intersects({
          type: 'Point',
          coordinates: point,
        });

      if (nearestPDV) {
        pdv = this.toDomain(nearestPDV.toObject());
      }
    } catch (error) {
      return;
    }

    return pdv;
  }

  public async getById(id: string): Promise<PDV | undefined> {
    let pdv: PDV | undefined;
    const retrievedPDV = await this.#model.findOne({ id }, null, { lean: true });
    if (retrievedPDV) {
      pdv = this.toDomain(retrievedPDV);
    }

    return pdv;
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
