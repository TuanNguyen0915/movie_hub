import User from "@/models/User.model";
import { connectToDB } from "@/services/connectMongodb";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { username, email, password } = await req.json();
    let user = await User.findOne({ email });
    if (user) {
      return new Response("User already exists", { status: 400 });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    user = await User.create({
      username,
      password: hashPassword,
      email,
    });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new user", { status: 500 });
  }
};
