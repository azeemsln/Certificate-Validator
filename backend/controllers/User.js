
import User from "../models/User.js";

const getDetails=async (req, res) => {
  try {
    const { certificateNumber } = req.params;
    // console.log(certificateNumber);
    
    const certNum = Number(certificateNumber)
    const user = await User.findOne({certificateNumber:certNum} );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export {getDetails}