import mongoose, { Document, Model, Schema } from "mongoose";
import { z } from "zod";

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  content: string;
  isRead: boolean;
  markAsRead: () => Promise<void>;
}

export const MessageZodSchema = z.object({
  sender: z.string().refine((val) => mongoose.isValidObjectId(val), {
    message: "Invalid sender ID",
  }),
  receiver: z.string().refine((val) => mongoose.isValidObjectId(val), {
    message: "Invalid receiver ID",
  }),
  content: z
    .string()
    .min(1, { message: "Message content is required" })
    .max(1000, { message: "Message can't exceed 1000 characters" }),
  isRead: z.boolean().optional(),
});
const MessageSchema = new Schema<IMessage>(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, "Message content is required"],
      maxlength: [1000, "Message can't exceed 1000 characters"],
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

MessageSchema.methods.markAsRead = async function () {
  this.isRead = true;
  await this.save();
};

const Message: Model<IMessage> = mongoose.model<IMessage>(
  "Message",
  MessageSchema
);

export const validateMessage = (message: IMessage) => {
  return MessageZodSchema.parse(message);
};
export default Message;
