import { connect, clearDatabase, closeDatabase } from '../../utils/dbconnection';
import PDVModel from '../../../src/shared/infra/database/mongoose/model/pdv';
import { pdvs } from '../../mock/mockdata.json';
import app from '../../../src/shared/infra/server/app';
import supertest from 'supertest';

const request = supertest(app);
beforeAll(async () => {
  await connect();
  await PDVModel.insertMany(pdvs);
});
afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});
describe('GetNearestPDVController Execute', () => {
  describe('returns 204 if', () => {
    test('none PDV near', (done) => {
      request.get(`/pdv/near/-105.01621/39.57422`).expect(204, done);
    });
  });
  describe('returns 200 with pdv data- ', () => {
    test('if near pdv', (done) => {
      const pdv = pdvs[42];
      request
        .get(`/pdv/near/${pdv.address.coordinates[0]}/${pdv.address.coordinates[1]}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            id: pdv.id,
            tradingName: pdv.tradingName,
            ownerName: pdv.ownerName,
            document: pdv.document,
            address: {
              type: 'Point',
              coordinates: pdv.address.coordinates,
            },
            coverageArea: {
              type: 'MultiPolygon',
              coordinates: pdv.coverageArea.coordinates,
            },
          });
          done();
        });
    });
  });
});
