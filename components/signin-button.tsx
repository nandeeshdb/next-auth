"use client"

import { Button } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import Link from "next/link"

function SignInButton() {
    const{data:session} = useSession()
    
  return (
    <div className=" flex items-center gap-2">
        {
            session && session.user ? (
                <>
                <p className="text-xl text-sky-400 hover:text-sky-600">{session.user.email}</p>
                <Link href='/api/auth/signout'>Sign Out</Link>
                </>
            ) : (
                <>
                    <Button as={Link}  href='/api/auth/signin'>Sign In</Button>
                    <Button as={Link}  href='/auth/sign-up'>Sign Up</Button>
                </>
            )
        }
    </div>
  )
}

export default SignInButton