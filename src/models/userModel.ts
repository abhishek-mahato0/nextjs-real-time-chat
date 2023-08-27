import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  chat: mongoose.Types.ObjectId[];
  friends: mongoose.Types.ObjectId[];
  // Add more fields as needed
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  chat: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  // Add more fields as needed
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
