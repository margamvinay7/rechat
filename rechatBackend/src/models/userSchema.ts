import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { z } from "zod";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  status?: string;
  lastSeen?: Date;
  publicProfile(): Document;
  isValidPassword(password: string): Promise<boolean>;
}

const UserValidationSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Please use a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  status: z
    .string()
    .max(100, { message: "Status can't exceed 100 characters" })
    .optional(),
  lastSeen: z.date().optional(),
});

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
      type: String,
      requried: [true, "Email is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    status: {
      type: String,
      default: "Hey there! I am using this chat app",
      maxlength: [100, "Status can't exceed 100 characters"],
    },
    lastSeen: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("publicProfile").get(function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    status: this.status,
    lastSeen: this.lastSeen,
  };
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export const validateUser = (user: IUser) => {
  return UserValidationSchema.parse(user);
};

export default User;
