import express from "express";
import dotenv from "dotenv";
import { connect } from "./config/database.js";
import User from "./models/User.js";
import adminRoutes from "./routes/Admin.js"
import userRoutes from "./routes/User.js"
import cookieParser from "cookie-parser"
import seedDefaultAdmin from './utils/seedAdmin.js';
import cors from 'cors'; // 👈 1. Import CORS

const router = express.Router();
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;


connect();
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173']; // 👈 Your frontend URL(s)
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true); 
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true, // 👈 REQUIRED to allow cookies (for your token setup)
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
);

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

const startServer = async () => {
  try {
      // 1. Await the Database Connection
      console.log("Attempting to connect to database...");
      await connect(); 
      console.log("Database connected successfully.");

      // 2. Seed Default Admin (only runs if no admin is found)
      await seedDefaultAdmin();

      // 3. Start the Express server
      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

  } catch (error) {
      console.error("🔥 FATAL ERROR DURING SERVER STARTUP:", error.message);
      // Exit process on connection failure
      process.exit(1); 
  }
}

// Execute the async startup function
startServer();



