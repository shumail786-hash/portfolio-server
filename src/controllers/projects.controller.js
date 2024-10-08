import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Projects } from "../models/projectsModel.js";

const projectsController = {
  uploadProjects: async (req, res) => {
    const { projectTitle, projectCategory, projectDescription } = req.body;
    const projectThumbnail = req.file ? req.file.filename : null;
    try {
      if (
        !projectCategory ||
        !projectDescription ||
        !projectThumbnail ||
        !projectTitle
      )
        return res.json(new ApiError(400, "Fill all required fields", false));
      const projectSummary = {
        projectCategory,
        projectDescription,
        projectThumbnail,
        projectTitle,
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
};

export default projectsController;
