import { connect, clearDatabase, closeDatabase } from '../../utils/dbconnection';
import PDVModel from '../../../src/shared/infra/database/mongoose/model/pdv';
import { getNearestPDV } from '../../../src/modules/pdv/usecases/getnearestpdv';
import { pdvs } from '../../mock/mockdata.json';

beforeAll(async () => {
  await connect();
  await PDVModel.insertMany(pdvs);
});
afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});
describe('GetNearestPDV Execute', () => {
  describe('returns Fail ', () => {
    test('if no near pdvs', async () => {
      const result = await getNearestPDV.execute([-105.01621, 39.57422]);
      expect(result.isFail()).toBe(true);
    });
  });
  describe('returns Success with pdv data- ', () => {
    test('if ID exists', async () => {
      const pdv = pdvs[23];
      const result = await getNearestPDV.execute([pdv.address.coordinates[0], pdv.address.coordinates[1]]);
      const value = result.value;
      expect(result.isSuccess()).toBe(true);
      expect(value).toEqual({
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
    });
  });
});
