import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Projects } from "../models/projectsModel.js";

const projectsController = {
  uploadProjects: async (req, res) => {
    const { projectTitle, projectCategory, projectDescription } = req.body;
    const projectThumbnail = req.file ? req.file.filename : null;
    const tags = req.body.tags;

    try {
      if (
        !projectCategory ||
        !projectDescription ||
        !projectThumbnail ||
        !projectTitle ||
        !tags
      ) {
        return res.json(new ApiError(400, "Fill all required fields", false));
      }

      // Ensure tags is an array
      const parsedTags = Array.isArray(tags)
        ? tags.map((tag) => ({ name: tag }))
        : [{ name: tags }];

      const projectSummary = {
        projectCategory,
        projectDescription,
        projectThumbnail,
        projectTitle,
        tags: parsedTags,
        createdBy: req.user._id,
      };

      const project = await Projects.create(projectSummary);
      return res.json(
        new ApiResponse(201, project, "Project Uploaded Successfully", true)
      );
    } catch (error) {
      return res.json(new ApiError(500, error.message, false));
    }
  },

  getAllProjects: async (req, res) => {
    const project = await Projects.find({});
    if (!project) {
      return res.json(new ApiError(404, "Projects not found", false));
    }
    return res.json(
      new ApiResponse(201, project, "Projects Successfully retrieved", true)
    );
  },
};

export default projectsController;
