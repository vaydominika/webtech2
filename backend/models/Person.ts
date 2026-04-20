import { Schema, model, Document } from 'mongoose';

export interface IPerson extends Document {
  name: string;
  phoneNumber: string;
  email?: string;
  address: string;
  status: 'ideiglenes' | 'végleges' | 'gondozó' | 'érdeklődő';
  notes?: string;
  assignedCats: Schema.Types.ObjectId[]; // Ref: Cat
  user: Schema.Types.ObjectId; // Ref: User
}

const personSchema = new Schema<IPerson>({
  name: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v: string) {
        return /^[^0-9]*$/.test(v);
      },
      message: 'A név nem tartalmazhat számokat.'
    }
  },
  phoneNumber: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v: string) {
        return /^\+36\s?[0-9\s-]{8,12}$/.test(v);
      },
      message: 'Kizárólag magyar formátumú telefonszám fogadható el (+36 ...).'
    }
  },
  email: {
    type: String,
    validate: {
      validator: function(v: string) {
        if (!v) return true; // Opvionális
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Érvénytelen email cím formátum.'
    }
  },
  address: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['ideiglenes', 'végleges', 'gondozó', 'érdeklődő'], 
    default: 'érdeklődő' 
  },
  notes: String,
  assignedCats: [{ type: Schema.Types.ObjectId, ref: 'Cat' }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Person = model<IPerson>('Person', personSchema);
