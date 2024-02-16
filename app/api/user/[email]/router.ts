import User from "@/models/User.model";
import { connectToDB } from "@/services/connectMongodb";

import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { email: string } },
) => {
  try {
    await connectToDB();
    const { email } = params;
    const user = await User.findOne({ email:email });
    if (!user) {
      throw new Error(`${email} not found`);
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
