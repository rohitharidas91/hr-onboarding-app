import { NextResponse } from "next/server";
import connect from "../../utils/db";
import User from "../../models/User";

export const GET = async () => {
  try {
    await connect();
    const users = await User.find().select('-password'); // Exclude the password field
    return NextResponse.json(
      users,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

