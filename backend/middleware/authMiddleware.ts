import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User"
import type { IUser } from "../models/User"

interface DecodedToken {
  id: string
}

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken

      const user = await User.findById(decoded.id).select("-password") as IUser | null

      if (!user) {
        return res.status(401).json({ message: "Not authorized, user not found" })
      }

      req.user = user
      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({ message: "Not authorized, token failed" })
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" })
  }
}
