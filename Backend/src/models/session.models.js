import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  roomName: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expertId: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', required: true },
  status: { type: String, enum: ['pending', 'active', 'ended'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  startedAt: { type: Date },
  endedAt: { type: Date }
});

const Session = mongoose.model('Session', sessionSchema);
export { Session };
