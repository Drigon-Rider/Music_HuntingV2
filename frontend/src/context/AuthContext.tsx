import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

interface User {
  _id: string
  username: string
  email: string
  token: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  register: (username: string, email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (user) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`
    } else {
      delete axios.defaults.headers.common["Authorization"]
    }
  }, [user])

  const register = async (username: string, email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        username,
        email,
        password,
      })
      const userData = response.data
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      navigate("/")
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      })
      const userData = response.data
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      navigate("/")
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
