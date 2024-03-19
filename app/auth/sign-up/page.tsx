import SignUpForm from "@/components/sign-up-form";
import { Link } from "@nextui-org/react";
import React from "react";

function SignUp() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center py-10">
      <SignUpForm />
      <div className="flex item-center justify-center gap-2">
        <p>Alredy have an account?</p>
        <Link href="/auth/sign-in">SignIn</Link>
      </div>
    </div>
  );
}

export default SignUp;
