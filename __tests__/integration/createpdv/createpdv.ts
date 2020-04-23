import { connect, clearDatabase, closeDatabase } from '../../utils/dbconnection';
import PDVModel from '../../../src/shared/infra/database/mongoose/model/pdv';
import { pdvs } from '../../mock/mockdata.json';
import { createPDV } from '../../../src/modules/pdv/usecases/createpdv';
const pdv = pdvs[0];
beforeAll(async () => {
  await connect();
  await PDVModel.create(pdv);
});
afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});
describe('CreatePDV Execute', () => {
  describe('returns Fail ', () => {
    test('if document already exists', async () => {
      const { id, ...pdvprops } = pdv;
      const result = await createPDV.execute(pdvprops);
      expect(result.isFail()).toBe(true);
    });
  });
  describe('returns Success ', () => {
    test('if valid pdv and document is new', async () => {
      const { id, ...pdvprops } = pdvs[2];
      const result = await createPDV.execute(pdvprops);
      expect(result.isSuccess()).toBe(true);
      expect(result.value).toMatchObject({
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
    });
  });
});
