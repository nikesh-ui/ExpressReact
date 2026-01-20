import { NextFunction, Request, Response } from "express";
import { User } from "../generated/prisma/client";
import { verify } from "jsonwebtoken";
import prisma from "../lib/prisma";

export interface ExpressRequest extends Request {
  user?: User;
}

export const authentication = async (
  req: ExpressRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.headers.authorization) {
    throw new Error("Unauthorized");
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    throw new Error("Token not found");
    next();
  }
  try {
    const decode = verify(token, "JWT_SECRET") as { email: string };
    const user = await prisma.user.findUnique({
      where: {
        email: decode.email,
      },
    });
    req.user = user ?? undefined;
    next();
  } catch (error) {
    req.user = undefined;
    next();
  }
};
