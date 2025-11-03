import express from "express";
import dotenv from "dotenv";
import { connect } from "./config/database.js";
import User from "./models/User.js";
import adminRoutes from "./routes/Admin.js"
import userRoutes from "./routes/User.js"
import cookieParser from "cookie-parser"

const router = express.Router();
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

connect();

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your Ten-Certificate-Validator server is up and running....",
  });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


app.use("/api/v1/admin",adminRoutes)
app.use("/api/v1/user",userRoutes)



