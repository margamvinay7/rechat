import { Request, Response } from "express";
import User, { validateUser } from "../models/userSchema";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerUser = async (req: Request, res: Response) => {
  try {
    validateUser(req.body);
    console.log("in register", req.body);
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({
      messsage: "User registered successfully",
      user: newUser.publicProfile,
    });
  } catch (error) {
    console.log("er", error);
    res.status(402).json({ message: "Error registering user", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify the password using the method on the schema
    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res
      .status(200)
      .json({ message: "Login successful", token, user: user.publicProfile });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
