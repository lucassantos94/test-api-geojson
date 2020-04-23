import { connect, clearDatabase, closeDatabase } from '../../utils/dbconnection';
import PDVModel from '../../../src/shared/infra/database/mongoose/model/pdv';
import { getPDVByID } from '../../../src/modules/pdv/usecases/getpdvbyid';
import { pdvs } from '../../mock/mockdata.json';
import { v4 as uuid } from 'uuid';
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
describe('GetById Execute', () => {
  describe('returns Fail ', () => {
    test('ID not exists', async () => {
      const result = await getPDVByID.execute(uuid());
      expect(result.isFail()).toBe(true);
    });
  });
  describe('returns Success with pdv data- ', () => {
    test('if ID exists', async () => {
      const result = await getPDVByID.execute(pdv.id);
      expect(result.isSuccess()).toBe(true);

      expect(result.value).toEqual({
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
