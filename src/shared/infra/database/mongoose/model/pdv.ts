import { Schema, model, Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
export interface IPDVModel extends Document {
  id: string;
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: {
    type: string;
    coordinates: number[][][][];
  };
  address: {
    type: string;
    coordinates: number[];
  };
}

const UserSchema = new Schema({
  id: {
    type: String,
    default: uuid,
  },
  tradingName: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
    unique: true,
  },
  coverageArea: {
    type: {
      type: String,
      enum: ['MultiPolygon'],
      required: true,
    },
    coordinates: {
      type: [[[[Number]]]], // 4 levels of array 1 - point, 2 - line, 3 - polygon, 4 multipolygon
      required: true,
    },
  },
  address: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

export default model<IPDVModel>('pdv', UserSchema);
