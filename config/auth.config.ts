import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { userSchema } from "@/schemas/userSchemas";
import prisma from '@/lib/prisma';
import { verifyPassword } from '@/lib/authUtils';
// import NextAuth, { Session, DefaultSession } from "next-auth";
import { User as NextAuthUser } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
// import { JWT } from "next-auth/jwt";
// import { User } from "next-auth";

export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {

                
                    const { email, password } = userSchema.parse(credentials);
                    const user = await prisma.user.findUnique({
                        where: {
                            email: email
                        }
                    });


                    if (!user || !user.password) {
                        return null;
                        //TODO: check if exists in Bubble
                    }

                    const isPasswordValid = await verifyPassword(password, user.password);
                    
                    if (!isPasswordValid) {
                        return null;
                    }
                    
                    return { id: user.id!.toString(), name: user.name, email: user.email };
                } catch (error) {
                    console.error('Login error:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        // async jwt({ token, user }: { token: JWT, user: NextAuthUser | AdapterUser }) {
        //     if (user?.email) {
        //         const dbUser = await getUser(user.email);
        //         token.id = dbUser?.id;
        //     }
        //     return token;
        // },
        // async session({ session, token }: { session: any, token: JWT }) {
        //     if (session.user) {
        //         session.user.id = token.id as string;
        //     }
        //     return session;
        // },
        async signIn({ user }: { user: NextAuthUser | AdapterUser }) {
            try {
                
                // if (!user.email) {
                //     throw new Error("Email is required");
                // }
                // const existingUser = await db.selectFrom('users')
                //     .select('image')
                //     .where('email', '=', user.email)
                //     .executeTakeFirst();

                // // if user does not exist, create a new user - only for google login
                // if (!existingUser) {
                //     await db.insertInto('users').values({
                //         id: crypto.randomUUID(),
                //         name: user.name,
                //         email: user.email,
                //         image: user.image, // Save the image URL
                //         updated_at: new Date()
                //     }).execute();
                // } else if (user.image && existingUser.image !== user.image) {
                //     // Update the image URL if it has changed
                //     await db.updateTable('users')
                //         .set({ image: user.image, updated_at: new Date() })
                //         .where('email', '=', user.email)
                //         .execute();
                // }
                return true;
            } catch (error) {
                console.error('Failed to fetch user:', error);
                throw new Error('Failed to fetch user.');
            }
        },
    },
} satisfies AuthOptions;