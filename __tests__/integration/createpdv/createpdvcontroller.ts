import { connect, clearDatabase, closeDatabase } from '../../utils/dbconnection';
import PDVModel from '../../../src/shared/infra/database/mongoose/model/pdv';
import { pdvs } from '../../mock/mockdata.json';
import app from '../../../src/shared/infra/server/app';
import supertest from 'supertest';
const pdv = pdvs[0];
const request = supertest(app);
beforeAll(async () => {
  await connect();
  await PDVModel.create(pdv);
});
afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});
describe('CreatePDVController exec', () => {
  describe('returns 400 ', () => {
    test('if invalid address', (done) => {
      const { id, ...pdvprops } = pdvs[1];
      request
        .post('/pdv/')
        .send({ ...pdvprops, address: { type: 'Point', coordinates: [123, 456, 789] } })
        .expect(400, done);
    });
    test('if invalid coverageArea', (done) => {
      const { id, ...pdvprops } = pdvs[1];
      request
        .post('/pdv/')
        .send({ ...pdvprops, coverageArea: { type: 'MultiPolygon', coordinates: [[[[123, 456, 789]]]] } })
        .expect(400, done);
    });
    test('if document already exists', (done) => {
      const { id, ...pdvprops } = pdv;
      request
        .post('/pdv/')
        .send({ ...pdvprops })
        .expect(400, done);
    });
  });
  describe('returns 200 with pdv data', () => {
    test('if valid pdv and document is new', (done) => {
      const { id, ...pdvprops } = pdvs[2];
      request
        .post('/pdv/')
        .send({ ...pdvprops })
        .expect(200)
        .then((response) => {
          expect(response.body.data).toMatchObject({
            id: expect.stringMatching(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
            tradingName: expect.stringMatching(pdvprops.tradingName),
            ownerName: expect.stringMatching(pdvprops.ownerName),
            document: expect.stringMatching(pdvprops.document),
            address: expect.objectContaining({
              type: 'Point',
              coordinates: pdvprops.address.coordinates,
            }),
            coverageArea: expect.objectContaining({
              type: 'MultiPolygon',
              coordinates: pdvprops.coverageArea.coordinates,
            }),
          });
          done();
        });
    });
  });
});
