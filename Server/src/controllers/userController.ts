import dotenv from "dotenv";
import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { compare, hash } from "bcryptjs";
import { User } from "../generated/prisma/client";
import { sign } from "jsonwebtoken";
dotenv.config();

const generateJwt = (user: User): string => {
  return sign({ email: user.email }, "JWT_SECRET", { expiresIn: "1d" });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, passowrd } = req.body;
    if (!email || !passowrd) {
      return res
        .status(400)
        .json({ message: "please enter the email and password" });
    }
    const hashedPassword = await hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: { ...req.body, password: hashedPassword },
    });
    const { password: _password, ...userWithoutPassowrd } = user;
    res.json({
      ...userWithoutPassowrd,
      token: generateJwt(user),
      success: true,
    });
  } catch (error) {
    res.json({ message: "error during registration", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      throw new Error("user no found");
    }
    const isPasswordCorrect = await compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Incorrect passowrd!");
    }
    const { password: _password, ...userWithoutPassowrd } = user;
    res.json({
      ...userWithoutPassowrd,
      token: generateJwt(user),
      success: true,
    });
  } catch (error) {
    res.json({ message: "error while logging in", error });
  }
};
