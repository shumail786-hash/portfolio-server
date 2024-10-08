import jwt from "jsonwebtoken";
import { Admin } from "../models/adminModel.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = async function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.json(new ApiError(404, "Unauthorized Request", false));
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    if (!decodedToken) {
      return res.json(ApiError(404, "Unauthorized Access", false));
    }
    // Proceed if the token is valid
    let user;
    if (decodedToken.role === "Admin") {
      user = await Admin.findOne({ _id: decodedToken._id });
      if (!user) return res.json(new ApiError(401, "User not found", false));

      req.user = user;
      next();
    }
  } catch (error) {
    return res.json(new ApiError(404, "Unauthorized Access", false));
  }
};
