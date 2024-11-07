import mongoose, { Schema, Document, Model } from "mongoose";
import { z } from "zod";

// Zod Schema for validation
const GroupZodSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Group name must be at least 3 characters" })
    .max(100, { message: "Group name can't exceed 100 characters" }),
  description: z
    .string()
    .max(250, { message: "Description can't exceed 250 characters" })
    .optional(),
  members: z
    .array(z.string())
    .max(500, { message: "A group cannot exceed 500 members" }),
  admin: z.string(),
});

// TypeScript Interface
export interface IGroup extends Document {
  name: string;
  description?: string;

  members: mongoose.Types.ObjectId[];
  admin: mongoose.Types.ObjectId;
}

// Custom validator for max array size
const arrayLimit = (val: mongoose.Types.ObjectId[]) => val.length <= 500;

// Mongoose Schema
const GroupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: [true, "Group name is required"],
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 250,
      default: "",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Group must have at least one member"],
        validate: [arrayLimit, "A group cannot exceed 500 members"],
      },
    ],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure admin is a member before saving
GroupSchema.pre("save", function (next) {
  if (!this.members.includes(this.admin)) {
    return next(new Error("Admin must be a member of the group"));
  }
  next();
});

export const validateGroup = (group: IGroup) => {
  return GroupZodSchema.parse(group);
};

const Group: Model<IGroup> = mongoose.model<IGroup>("Group", GroupSchema);

export default Group;
