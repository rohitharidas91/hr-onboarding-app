import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    completionDate: {
      type: String,
      required: true,
    },
    phase: {
      type: Number,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
