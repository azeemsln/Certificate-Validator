import express from "express"
import { addUser, login, logout } from "../controllers/Admin.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();


// router.post("/signup", signup);
router.post("/login", login);
router.post("/adduser",auth, addUser);
router.post("/logout",auth, logout);


export default router;