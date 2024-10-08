import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/adminModel.js";

const adminController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      if (!name || !email || !password)
        return res.json(new ApiError(409, "Fill all fields", false));

      // Check Admin already registered or not
      let emailCheck = await Admin.findOne({ email });
      if (emailCheck) {
        return res.json(new ApiError(401, "Email already registered", false));
      }
      const createAdmin = await Admin.create(req.body);
      return res.json(
        new ApiResponse(201, createAdmin, "Admin Created Successfully", true)
      );
    } catch (error) {
      return res.json(new ApiError(401, error.message, false));
    }
  },

  // logging in the Admin
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await Admin.findOne({ email });
      if (!user) return res.json(new ApiError(401, "Email not found", false));
      // checking password

      const isPasswordValid = await user.isPasswordCorrect(password);
      if (!isPasswordValid)
        return res.json(new ApiError(401, "Incorrect Password", false));

      const accessToken = await user.generateAccessToken();

      return res.json(
        new ApiResponse(
          201,
          { user, accessToken },
          "Admin Logged In Successfully",
          true
        )
      );
    } catch (error) {
      return res.json(new ApiError(401, error.message, false));
    }
  },
  log: async (req, res) => {
    const user = req.user;
    // console.log(user);
    return res.json(new ApiResponse(201, "", "Hye", true));
  },
};

export default adminController;
