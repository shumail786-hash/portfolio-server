import mongoose, { Schema } from "mongoose";
import dayjs from "dayjs";

const projectsSchema = new Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  projectCategory: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectThumbnail: {
    type: String,
    required: true,
  },
  tags: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: String,
    default: dayjs(new Date().toISOString()).format("DD-MM-YYYY hh:mm:ss A"),
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
});

export const Projects = mongoose.model("Project", projectsSchema);
