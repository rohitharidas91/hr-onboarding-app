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
    const task = await Task.findByIdAndUpdate(id, request.body);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
