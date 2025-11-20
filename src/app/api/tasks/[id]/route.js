import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import Task from "../../../models/Task";

export const GET = async (request, { params }) => {
  const { id } = await params;
  try {
    await connect();
    const task = await Task.findById(id);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = await params;
  try {
    await connect();
    const body = await request.json();
    const task = await Task.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = await params;
  try {
    await connect();
    const task = await Task.findByIdAndDelete(id);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
