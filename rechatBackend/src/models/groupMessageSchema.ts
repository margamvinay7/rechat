import mongoose, { Schema, Document, Model } from "mongoose";
import { z } from "zod";

// Zod Schema for validation
const GroupZodMessageSchema = z.object({
  group: z.string().min(1, { message: "Group ID is required" }),
  sender: z.string().min(1, { message: "Sender ID is required" }),
  content: z
    .string()
    .max(1000, { message: "Message can't exceed 1000 characters" }),
});

// TypeScript Interface
export interface IGroupMessage extends Document {
  group: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  content: string;
}

// Mongoose Schema
const GroupMessageSchema = new Schema<IGroupMessage>(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, "Message content is required"],
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

// Static method to mark all group messages as read for a user
GroupMessageSchema.statics.markAsReadForUser = async function (
  groupId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId
) {
  return await this.updateMany(
    { group: groupId, sender: { $ne: userId } },
    { $set: { isRead: true } } // You would need an `isRead` field in the schema for this to work
  );
};

export const validateGroupMessage = (groupMessage: IGroupMessage) => {
  return GroupZodMessageSchema.parse(groupMessage);
};

export const GroupMessage: Model<IGroupMessage> = mongoose.model<IGroupMessage>(
  "GroupMessage",
  GroupMessageSchema
);
