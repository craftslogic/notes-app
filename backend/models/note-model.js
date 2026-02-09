
import mongoose from 'mongoose';
const { Schema } = mongoose;

export const noteSchema = new Schema({

  title: { type: String, required: true  },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  isPinned: { type: Boolean, default: false },
  userId:{type: String, required:true},

  createdAt: { type: Date, default: Date.now },
});

export const Note = mongoose.model('Note', noteSchema);


