import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import { connectToDatabase } from "@/config/mongodb";

export default NextAuth({
    secret: process.env.SECRET_KEY,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                _id: { label: "_id", type: "text" },
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any, req) {
                try {
                    const client = await connectToDatabase();
                    const db = client.db("movie_trailer");
                    const user = await db.collection('users').findOne({ username: credentials.username });

                    if (!user) {
                        throw new Error("User not found!")
                    }

                    if (!bcrypt.compareSync(credentials.password, user.password)) {
                        throw new Error("Username or Password is incorrect!");
                    }

                    return user as any;
                } catch (error) {
                    throw new Error("Username or password is incorrect");
                }
            }
        }),
    ],
    callbacks: {
        session({ session, token, user }) {
            return session // The return type will match the one returned in `useSession()`
        },
        signIn({ user, account, profile, email, credentials }) {
            return true
        },

    },
    pages: {
        signIn: "/auth/signin",
    }
})