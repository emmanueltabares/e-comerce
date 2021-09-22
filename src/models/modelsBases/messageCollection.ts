import mongoose from "mongoose";

const messagesCollection = "message";

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  email: { type: String, required: true },
  createat: { type: Date },
});

export const messages = mongoose.model(messagesCollection, messageSchema);