"use client";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { Button, Checkbox, Input } from "@nextui-org/react";
import React, { useState } from "react";
import validator from "validator";
import { z } from "zod";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Atleast 2 cahracters required")
      .max(50, "Only 50characters are allowed")
      .regex(new RegExp("^[a-zA-Z]$", "Special Characters are not allowed")),
    lastName: z
      .string()
      .min(2, "Atleast 2 cahracters required")
      .max(50, "Only 50characters are allowed")
      .regex(new RegExp("^[a-zA-Z]$", "Special Characters are not allowed")),
    email: z.string().email("Please enter correct email address"),
    phoneNumber: z
      .string()
      .refine(validator.isMobilePhone, "Please enter correct phone number"),
    password: z.string().min(6, "Password should be atleast 6 character long"),
    confirmPassword: z
      .string()
      .min(6, "Password should be atleast 6 character long"),
    accepted: z.literal(true, {
      errorMap: () => ({
        message: "Please accept terms and conditions",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm password doesn't match",
    path: ["password", "confirmPassword"],
  });

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <form className="flex flex-col w-full px-96 gap-3">
      <Input
        label="First Name"
        startContent={<UserCircleIcon className="w-4 h-4" />}
      />
      <Input
        label="Last Name"
        startContent={<UserCircleIcon className="w-4 h-4" />}
      />
      <Input
        label="Phone number"
        startContent={<PhoneIcon className="w-4 h-4" />}
      />
      <Input
        label="Email"
        startContent={<EnvelopeIcon className="w-4 h-4" />}
        type="email"
      />
      <Input
        label="Password"
        startContent={<KeyIcon className="w-4 h-4" />}
        type={showPassword ? "text" : "password"}
        endContent={
          showPassword ? (
            <EyeSlashIcon
              className="w-4 h-4  cursor-pointer"
              onClick={showPasswordHandler}
            />
          ) : (
            <EyeIcon
              className="w-4 h-4 cursor-pointer"
              onClick={showPasswordHandler}
            />
          )
        }
      />
      <Input
        label="Confirm Password"
        startContent={<KeyIcon className="w-4 h-4" />}
        type={showPassword ? "text" : "password"}
      />

      <Checkbox>I accept the terms and condition</Checkbox>

      <Button type="submit" color="primary">
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;
