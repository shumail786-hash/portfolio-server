import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./database/index.js";
dotenv.config({ path: ".env" });

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    try {
      console.log(`Server is listening on http://localhost:${PORT}`);
    } catch (error) {
      console.log(error);
    }
  });
});
