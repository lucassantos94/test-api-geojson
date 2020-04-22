import { PDV } from '../../src/modules/pdv/domain/pdv';
import { coordinate } from '../../src/modules/pdv/domain/geojson';

let pdv: {
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: coordinate[][][];
  address: coordinate;
};
let id: string;
beforeEach(() => {
  id = '1';
  pdv = {
    tradingName: 'Adega da Cerveja - Pinheiros',
    ownerName: 'Zé da Silva',
    document: '1432132123891/0001', // CNPJ
    coverageArea: [
      [
        [
          [30, 20],
          [45, 40],
          [10, 40],
          [30, 20],
        ],
      ],
      [
        [
          [15, 5],
          [40, 10],
          [10, 20],
          [5, 10],
          [15, 5],
        ],
      ],
    ],

    address: [-46.57421, -21.785741],
  };
});
describe('PDV Entity', () => {
  describe('Create returns Success if valid props with', () => {
    it('new id if none specified', () => {
      const result = PDV.Create(pdv);
      const value = result.value as PDV;
      expect(result.isSuccess()).toBe(true);
      expect(result.value).toBeInstanceOf(PDV);
      expect(value.id).not.toBeUndefined();
      expect(value.id.length).toBeGreaterThan(0);
    });
    it('same id if id is specified', () => {
      const result = PDV.Create(pdv, id);
      const value = result.value as PDV;
      expect(result.isSuccess()).toBe(true);
      expect(result.value).toBeInstanceOf(PDV);
      expect(value.id).not.toBeUndefined();
      expect(value.id).toBe(id);
    });
  });
});
