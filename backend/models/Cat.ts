import { Schema, model, Document } from 'mongoose';

interface IMedicalData {
  lastVaccination?: Date;
  isNeutered: boolean;
  diseases?: string[];
  specialDiet?: string;
  weightHistory?: { date: Date; weight: number }[];
}

export interface ICat extends Document {
  name: string;
  estimatedAge?: number;
  gender: 'hím' | 'nőstény';
  color: string;
  breed?: string;
  arrivalDate: Date;
  chipNumber?: string;
  description: string[];
  imageUrl?: string;
  status: 'örökbefogadható' | 'örökbeadva' | 'kezelés alatt' | 'karantén';
  location?: string;
  medicalInfo: IMedicalData;
}

const medicalSchema = new Schema<IMedicalData>({
  lastVaccination: Date,
  isNeutered: { type: Boolean, default: false },
  diseases: [String],
  specialDiet: String,
  weightHistory: [{ date: Date, weight: Number }]
}, { _id: false });

const catSchema = new Schema<ICat>({
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
  estimatedAge: Number,
  gender: { type: String, enum: ['hím', 'nőstény'], required: true },
  color: { type: String, required: true },
  breed: String,
  arrivalDate: { type: Date, default: Date.now },
  chipNumber: String,
  description: [String],
  imageUrl: String,
  status: { 
    type: String, 
    enum: ['örökbefogadható', 'örökbeadva', 'kezelés alatt', 'karantén'],
    default: 'örökbefogadható'
  },
  location: String,
  medicalInfo: { type: medicalSchema, default: () => ({ isNeutered: false }) }
}, { timestamps: true });

export const Cat = model<ICat>('Cat', catSchema);
