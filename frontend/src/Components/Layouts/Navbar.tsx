import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Download, Library, Heart, Menu, X, Home, Headphones } from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Headphones className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Music Hunter</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link to="/search" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
            <Search className="h-4 w-4" />
            Search
          </Link>
          <Link to="/downloads" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
            <Download className="h-4 w-4" />
            Downloads
          </Link>
          <Link to="/library" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
            <Library className="h-4 w-4" />
            Library
          </Link>
          <Link to="/favorites" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
            <Heart className="h-4 w-4" />
            Favorites
          </Link>
        </nav>

        <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-md hover:opacity-90">
          Sign In
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="container md:hidden py-4">
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              to="/search"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            <Link
              to="/downloads"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              <Download className="h-4 w-4" />
              Downloads
            </Link>
            <Link
              to="/library"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              <Library className="h-4 w-4" />
              Library
            </Link>
            <Link
              to="/favorites"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="h-4 w-4" />
              Favorites
            </Link>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-md hover:opacity-90">
              Sign In
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}