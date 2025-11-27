import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
// import { v4 as uuidv4 } from "uuid";

// const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existingAdmin = await Admin.findOne();
//     if (existingAdmin) {
//       return res.status(400).json({
//         success: false,
//         message: "Admin already exists. Only one admin is allowed.",
//       });
//     }

//     if (!name || !email || !password) {
//       return res.status(403).send({
//         success: false,
//         message: "All Fields are required",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10)

//     const admin = await Admin.create({
//       name,
//       email,
//       password:hashedPassword,
//     });

//     res.status(201).json({
//       success: true,
//       data: admin,
//       message: "Admin created successfully!",
//     });
//   } catch (error) {
//     console.error("Error creating admin:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error creating admin",
//       error: error.message,
//     });
//   }
// };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email,password);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: `This is not admin email.`,
      });
    }

    if (await bcrypt.compare(password, admin.password)) {
      const payload = {
        email: admin.email,
        id: admin._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        admin,
        message: `Admin Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};
const addUser = async (req, res) => {
  const { name, email, phone, employeeID, startDate, endDate, Domain } = req.body;

  // ------------------ Certificate Generator ------------------
  const generateCertificateNumber = async () => {
    const lastUser = await User.findOne().sort({ createdAt: -1 });
    const lastCertificate = lastUser?.certificateNumber;

    let nextNumber = 21990; // starting number

    if (lastCertificate) {
      const lastNum = parseInt(lastCertificate.split("/")[2]);
      if (!isNaN(lastNum)) {
        nextNumber = lastNum + 1;
      }
    }

    // const domainCode = employeeID.split("/")[1];
    return `TEN/CL/${nextNumber}`;
  };

  try {
    // ------------------ Generate Unique Certificate ------------------
    let certificateNumber;
    let isDuplicate;

    do {
      certificateNumber = await generateCertificateNumber();
      isDuplicate = await User.findOne({ certificateNumber });
    } while (isDuplicate);

    // ------------------ Create User ------------------
    const user = await User.create({
      certificateNumber,
      name,
      email,
      phone,
      employeeID,
      startDate,
      endDate,
      Domain,
    });

    return res.status(201).json({
      success: true,
      data: user,
      message: "User added successfully!",
    });

  } catch (error) {
    console.error("Error in adding user:", error);

    // Duplicate key error (email or employeeID)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A user with this email or Employee ID already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error in adding user",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.status(200).json({
      success: true,
      message: "Admin logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Logout failed. Please try again later.",
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find(
      {},
      {
        certificateNumber: 1,
        name: 1,
        email: 1,
        phone: 1,
        employeeID: 1,
        startDate: 1,
        endDate: 1,
        Domain: 1,
        updatedAt:1
      }
    );

    // console.log(allUser.length);
    return res.status(200).json({
      success: true,
      data: allUser,
    });
  } catch (error) {
    // console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch all User Data`,
      error: error.message,
    });
  }
};

// export { login, addUser, logout,signup };
export { login, addUser, logout, getAllUser };
