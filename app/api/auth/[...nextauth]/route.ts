import prisma from '@/lib/prisma';
import * as bcrypt from "bcryptjs";
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions : AuthOptions ={
    providers:[
        CredentialsProvider({

            name:"Credentials",
            credentials:{
                username:{
                    type:"text",
                    label:"Username",
                    placeholder:"Enter your username"
                },
                password:{
                    type:"password",
                    label:"password",
                    placeholder:"Enter your password"
                },
            },

            async authorize(credentials){
                const user = await prisma.user.findUnique({
                    where:{
                        email:credentials?.username,
                    }
                })

                if(!user) throw new Error("User not found")

                if(!credentials?.password) throw new Error("Password required")

                const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
                if(!isPasswordCorrect) throw new Error("Password is incorrect")

                const{password,...userWithoutPassword} = user
                return userWithoutPassword
            }

        })
    ]

}


const handler = NextAuth(authOptions)

export{handler as GET , handler as POST}