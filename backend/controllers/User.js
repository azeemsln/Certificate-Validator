
import User from "../models/User.js";

const getDetails=async (req, res) => {
  try {
    const certificateNo =decodeURIComponent(req.params.certificateNumber);
    console.log(req.params);
    const user = await User.findOne({certificateNumber:certificateNo } );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "The certificate number you entered does not exist or is incorrect. Please verify and try again.",
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