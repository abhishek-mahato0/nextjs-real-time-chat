import mongoose, { Document, Schema } from 'mongoose';

interface IChat extends Document {
  name: string;
  latestmes: string;
  admin: mongoose.Types.ObjectId;
  isGroup: boolean;
  members: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
  // Add more fields as needed
}

const chatSchema = new Schema<IChat>(
  {
    name: { type: String },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    latestmes: {
      type: String,
      default: '',
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    messages: [
      {
        sender: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // Add more fields as needed
  },
  {
    timestamps: true,
  }
);

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model<IChat>('Conversation', chatSchema);

export default Conversation;
