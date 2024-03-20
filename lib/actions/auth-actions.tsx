"use server"
import { User } from "@prisma/client";
import prisma from "../prisma";
import { hash } from "bcryptjs";

interface props{
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;

}

export const registerUser = async (user:props) => {
  const result = await prisma.user.create({
    data: {
      ...user,
      password:await hash(user.password,10)
    },
  });
};
