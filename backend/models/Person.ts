import { Schema, model, Document } from 'mongoose';

export interface IPerson extends Document {
  name: string;
  phoneNumber: string;
  address: string;
  status: 'ideiglenes' | 'végleges' | 'gondozó' | 'érdeklődő';
  notes?: string;
  assignedCats: Schema.Types.ObjectId[]; // Ref: Cat
}

const personSchema = new Schema<IPerson>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['ideiglenes', 'végleges', 'gondozó', 'érdeklődő'], 
    default: 'érdeklődő' 
  },
  notes: String,
  assignedCats: [{ type: Schema.Types.ObjectId, ref: 'Cat' }]
}, { timestamps: true });

export const Person = model<IPerson>('Person', personSchema);
