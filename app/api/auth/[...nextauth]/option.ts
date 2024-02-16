import User from "@/models/User.model";
import { connectToDB } from "@/services/connectMongodb";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required");
        }

        await connectToDB();
        let user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found");
        }
        const isMatchingPassword = bcrypt.compareSync(
          credentials.password,
          user.password,
        );
        if (!isMatchingPassword) {
          throw new Error("Password not matching");
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
