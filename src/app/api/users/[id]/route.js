import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import User from "../../../models/User";

export const GET = async (request, { params }) => {
  const { id } = await params;
  try {
    await connect();
    const user = await User.findById(id).select("-password");
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = await params;
  try {
    await connect();
    const user = await User.findByIdAndUpdate(id, request.body);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = await params;
  try {
    await connect();
    const user = await User.findByIdAndDelete(id);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
