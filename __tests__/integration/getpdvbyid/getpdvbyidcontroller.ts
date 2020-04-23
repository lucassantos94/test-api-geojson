import { connect, clearDatabase, closeDatabase } from '../../utils/dbconnection';
import PDVModel from '../../../src/shared/infra/database/mongoose/model/pdv';
import { pdvs } from '../../mock/mockdata.json';
import app from '../../../src/shared/infra/server/app';
import supertest from 'supertest';
import { v4 as uuid } from 'uuid';
const request = supertest(app);
let pdv;
beforeAll(async () => {
  await connect();
  const { id, ...pdvprops } = pdvs[0];
  const { id: newID } = await PDVModel.create(pdvprops);
  pdv = { id: newID, ...pdvprops };
});
afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});
describe('GetByIdController Execute', () => {
  describe('returns 204 if', () => {
    test('ID not exists', (done) => {
      request.get(`/pdv/${uuid()}`).expect(204, done);
    });
  });
  describe('returns Success with pdv data- ', () => {
    test('if ID exists', (done) => {
      request
        .get(`/pdv/${pdv.id}`)
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
