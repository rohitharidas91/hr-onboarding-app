import { NextResponse } from "next/server";
import connect from "../../utils/db";
import Task from "../../models/Task";

export const GET = async () => {
  try {
    await connect();
    const tasks = await Task.find();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

