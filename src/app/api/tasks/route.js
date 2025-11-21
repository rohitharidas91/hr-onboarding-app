import { NextResponse } from "next/server";
import connect from "../../utils/db";
import Task from "../../models/Task";

export const GET = async (request) => {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get("employeeId");
    const phaseParam = searchParams.get("phase");

    const query = {};

    if (employeeId) {
      query.employeeId = employeeId;
    }

    if (phaseParam) {
      const phase = Number(phaseParam);
      if (!Number.isNaN(phase)) {
        query.phase = phase;
      }
    }

    const tasks = await Task.find(query);
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();
  const newTask = new Task(body);

  try {
    await connect();
    await newTask.save();
    return new NextResponse(JSON.stringify(newTask), { status: 201 });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
