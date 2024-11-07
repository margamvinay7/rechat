import { onlineUsers } from "../index";
import User from "../models/userSchema";
import { Response, Request } from "express";

export const getOnlineUsers = async (req: Request, res: Response) => {
  try {
    const onlineUserIds = Object.keys(onlineUsers);
    console.log(onlineUserIds);
    const usersData = await User.find({ _id: { $in: onlineUserIds } });
    const usersWithPublicProfile = usersData.map(
      (user) => user.toJSON().publicProfile
    );

    console.log("users data", usersWithPublicProfile);
    res.status(201).json({ users: usersWithPublicProfile });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
