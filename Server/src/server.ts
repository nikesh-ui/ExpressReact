import dotenv from "dotenv";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import prisma from "./lib/prisma";
import { compare, hash } from "bcryptjs";
import { User } from "./generated/prisma/client";
import { sign } from "jsonwebtoken";
import { authentication, ExpressRequest } from "./middlewares/auth";
import cookieParser from "cookie-parser";

const app = express();
const generateJwt = (user: User): string => {
  return sign({ email: user.email }, "JWT_SECRET", { expiresIn: "1d" });
};
const corsOptions = {
  origin: ["http://localhost:5173/"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.post("/users/register", async (req: Request, res: Response) => {
  try {
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
});

app.post("/users/login", async (req: Request, res: Response) => {
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
});

app.get(
  "/landing",
  authentication,
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401);
      }
      const { password: _password, id: _id, ...userInfo } = req.user;
      res.json({ ...userInfo, success: true });
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  "/user",
  authentication,
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401);
      }
      const { password: _password, ...userWithoutPassowrd } = req.user;
      res.json({ ...userWithoutPassowrd, token: generateJwt(req.user) });
    } catch (error) {
      // res.json({ message: "error while authorizing", error });
      next(error);
    }
  },
);

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST;

app.listen(PORT, () => {
  console.log(`Running on  http://${HOST}:${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "test message for root path" });
});
