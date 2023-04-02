import { Request, Response } from "express";

import { getUsers, deleteUserById, getUserById } from "../db/users";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.sendStatus(404);
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.sendStatus(404);
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user.username = username;
    await user.save();

    return res.sendStatus(200).json(user).end();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.sendStatus(400);
    }
  }
};
