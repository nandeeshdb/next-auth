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
