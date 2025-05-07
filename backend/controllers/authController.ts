import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User"

// Generate JWT
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  })
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({ message: "Invalid user data" })
    }
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: error.message || "Server error" })
  }
}

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: error.message || "Server error" })
  }
}

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" })
    }

    const user = await User.findById(req.user._id)

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      })
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: error.message || "Server error" })
  }
}
