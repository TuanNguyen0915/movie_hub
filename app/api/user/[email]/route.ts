import User from "@/models/User.model";
import { connectToDB } from "@/services/connectMongodb";

import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { email: string } }) => {
  try {
    await connectToDB()
    const { email} = params
    const loggedUser = await User.findOne({ email: email })
    if (!loggedUser) {
      throw new Error('User not found')
    }
    const {password, ...rest} = loggedUser._doc
    const user = rest
    return new Response(JSON.stringify(user), { status: 200 })
  } catch (err: any) {
    console.log(err)
    throw new Error(`Failed to get user: ${err.message}`)
  }
}

export const POST = async (
  req: NextRequest,
  { params }: { params: { email: string } },
) => {
  try {
    await connectToDB();
    const { email } = params;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error(`User not found`);
    }
    const { movieId } = await req.json();
    console.log(movieId)
    const isFavorite = user.favoriteMovies.includes(movieId);
    if (!isFavorite) {
      user.favoriteMovies.push(movieId);
    }
    await user.save();
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
