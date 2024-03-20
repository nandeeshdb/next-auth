"use client";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { passwordStrength } from "check-password-strength";
import React, { useEffect, useState } from "react";
import { useForm ,SubmitHandler, Controller} from "react-hook-form";
import validator from "validator";
import { z } from "zod";
import PasswordStrengthChecker from "./pass-strength-checker";
import { registerUser } from "@/lib/actions/auth-actions";
import { toast } from "react-toastify";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Atleast 2 cahracters required")
      .max(50, "Only 50characters are allowed")
      ,
    lastName: z
      .string()
      .min(2, "Atleast 2 cahracters required")
      .max(50, "Only 50characters are allowed")
      ,
    email: z.string().email("Please enter correct email address"),
    phone: z
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
    path: ["confirmPassword"],
  });


  type inputType = z.infer<typeof formSchema>

function SignUpForm() {
  const{register,handleSubmit,reset,control,formState:{errors},watch} = useForm<inputType>({
    resolver:zodResolver(formSchema)
  })
  const [showPassword, setShowPassword] = useState(false);
  const[passStrength,setPassStrength] = useState(0)

    useEffect(()=>{
        setPassStrength(passwordStrength(watch().password).id)

    },[watch().password])
  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const saveUser : SubmitHandler<inputType>=async(data)=>{
    try {
      const{accepted,confirmPassword,...user} =data
      const result = await registerUser(user)
      toast.success("User created")
      
      
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")

      
    }
  }
  return (
    <form className="flex flex-col w-full px-96 gap-3" onSubmit={handleSubmit(saveUser)}>
      <Input
        label="First Name"
        {...register("firstName")}
        errorMessage={errors.firstName?.message}
        startContent={<UserCircleIcon className="w-4 h-4" />}
      />
      <Input
      {...register("lastName")}
        label="Last Name"
        errorMessage={errors.lastName?.message}
        startContent={<UserCircleIcon className="w-4 h-4" />}
      />
      <Input
      {...register("phone")}
      
      errorMessage={errors.phone?.message}
        label="Phone number"
        startContent={<PhoneIcon className="w-4 h-4" />}
      />
      <Input
      {...register("email")}
        label="Email"
        errorMessage={errors.email?.message}
        startContent={<EnvelopeIcon className="w-4 h-4" />}
        type="email"
      />
      <Input
      {...register("password")}
        label="Password"
        errorMessage={errors.password?.message}
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
      <PasswordStrengthChecker passwordStrength={passStrength}/>
      <Input
      {...register("confirmPassword")}
        label="Confirm Password"
        errorMessage={errors.confirmPassword?.message}
        startContent={<KeyIcon className="w-4 h-4" />}
        type={showPassword ? "text" : "password"}
      />

      
      <Controller control={control} name="accepted"  render={({field})=>(

        <Checkbox onChange={field.onChange}  onBlur={field.onBlur}>I accept the terms and condition</Checkbox>
      )} />

      {
        !!errors.accepted && (<p className="text-red-600">{errors.accepted.message}</p>)
      }

      <Button type="submit" color="primary">
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;
