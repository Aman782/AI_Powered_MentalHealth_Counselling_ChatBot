import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
export const registerUser = async (req, res) => {
   try {
     const { username, email, password, role, expertRole } = req.body;
 
     console.log(username, email, role, expertRole);
 
     if ([username, email, password, role].some((field) => field?.trim() === "")) {
       return res.status(401).json({ message: "All fields are required" });
     }
 
     const userExists = await User.findOne({ email });
     if (userExists) {
       return res.status(400).json({ message: "User already exists" });
     }
 
     const createdUser = await User.create({
       username,
       email,
       password,
       role, 
       specialization: role === "expert" ? expertRole : undefined, 
     });
 
     const resUser = await User.findById(createdUser._id).select("-password -refreshToken");
 
     if (!resUser) {
       return res.status(500).json({ message: "Something went wrong" });
     }
 
     return res.status(201).json(resUser);
   } catch (error) {
     return res.status(500).json({ message: error.message || "Internal Server Error" });
   }
 };
 
// ---------------- TOKEN GENERATOR ----------------
const generateAccessTokenAndRefreshToken = async (userId) => {
   const user = await User.findById(userId);

   const accessToken = user.generateAccessToken();
   const refreshToken = user.generateRefreshToken();

   user.refreshToken = refreshToken;

   await user.save({ validateBeforeSave: false });

   return { accessToken, refreshToken };
};

// -------------- LOGIN --------------
export const loginUser = async (req, res) => {
   const { username, email, password } = req.body;
   console.log("Email: ", email);
   console.log("Username: ", username);
   console.log("Password: ", password);

   if (!username && !email) {
      return res.status(401).json("Username or email required");
   }

   const user = await User.findOne({
      $or: [{ username }, { email }]
   });

   console.log(user);
   if (!user) {
      return res.status(404).json("User does not exist");
   }

   const validatePassword = await user.isPasswordCorrect(password);
   console.log(validatePassword);
   if (!validatePassword) {
      return res.status(401).json("Incorrect Credentials, try again");
   }

   const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

   const LoggedInUser = await User.findById(user._id).select("-password -refreshToken");

   const options = {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 1000 * 60 * 60 * 24 * 7
   };

   return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({LoggedInUser});
};

// -------------- LOGOUT --------------
export const logoutUser = async (req, res) => {
   try {
      await User.findByIdAndUpdate(
         req.user._id,
         { $unset: { refreshToken: 1 } },
         { new: true }
      );

      const options = {
         httpOnly: true,
         secure: false,
         sameSite: 'Lax',
         maxAge: 1000 * 60 * 60 * 24 * 7
      };

      return res
         .status(200)
         .clearCookie("accessToken", options)
         .clearCookie("refreshToken", options)
         .json({ message: "User Logged out Successfully" });
   } catch (error) {
      return res.status(401).json(error.message || "Invalid Access Token!");
   }
};

// -------------- REFRESH TOKEN --------------
export const refreshAccessTokenAfterExpiry = async (req, res) => {
   const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

   if (!incomingRefreshToken) {
      return res.status(401).json("Unauthorized Access");
   }

   try {
      const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

      const user = await User.findById(decodedToken?._id);

      if (!user) {
         return res.status(401).json("Invalid Refresh Token");
      }

      if (incomingRefreshToken !== user?.refreshToken) {
         return res.status(401).json("Invalid Refresh Token");
      }

      const { accessToken, refreshToken: newRefreshToken } = await generateAccessTokenAndRefreshToken(user._id);

      const options = {
         httpOnly: true,
         secure: false,
         sameSite: 'Lax',
         maxAge: 1000 * 60 * 60 * 24 * 7
      };

      return res
         .status(200)
         .cookie("accessToken", accessToken, options)
         .cookie("refreshToken", newRefreshToken, options)
         .json({ message: "Access Token Refreshed Successfully" });
   } catch (error) {
      return res.status(401).json(error.message || "Invalid refreshToken");
   }
};

// -------------- CHANGE PASSWORD --------------
export const changePassword = async (req, res) => {
   try {
      const { oldPassword, newPassword, confirmPassword } = req.body;

      if (newPassword !== confirmPassword) {
         return res.status(400).json("Passwords do not match");
      }

      const user = await User.findById(req.user?._id);

      const isValidPassword = await user.isPasswordCorrect(oldPassword);

      if (!isValidPassword) {
         return res.status(401).json("Incorrect Old Password");
      }

      user.password = newPassword;
      await user.save({ validateBeforeSave: false });

      return res.status(200).json("Password Changed Successfully");
   } catch (error) {
      return res.status(401).json(error.message || "Invalid Access");
   }
};

// -------------- CHANGE USERNAME --------------
export const changeUsername = async (req, res) => {
   try {
      const { newUsername, confirmUsername } = req.body;

      if (newUsername !== confirmUsername) {
         return res.status(400).json("Usernames do not match");
      }

      const user = await User.findById(req.user?._id);

      user.username = newUsername;
      await user.save({ validateBeforeSave: false });

      return res.status(200).json("Username Changed Successfully");
   } catch (error) {
      return res.status(401).json(error.message || "Invalid Access");
   }
};

export const getExpertDetails = async (req, res)=>{
    try {
      const expertId = req.user.id;
      const expert = await User.findById(expertId);
  
      if(!expert){
        return res.status(404).json({message: "Expert does not exists!"});
      }
  
      return res.status(201).json(expert);
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Internal Server Error!"});
    }
}


export const getUserDetails = async(req, res) =>{
   try {
      const userId = req.user._id;
      console.log("userId here : ",userId);
   
      const user = await User.findById(userId).select("-password");
   
      if(!user){
         return res.status(404).json({message: "User does not exists!"});
      }
   
      return res.status(200).json(user);
   } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Server error"});
   }


}
