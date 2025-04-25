import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Youtube, Headphones } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Headphones className="h-6 w-6 text-purple-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Music Hunter
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Discover, search, and download your favorite music all in one place.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/trending" className="text-muted-foreground hover:text-primary">
                  Trending Music
                </Link>
              </li>
              <li>
                <Link to="/new-releases" className="text-muted-foreground hover:text-primary">
                  New Releases
                </Link>
              </li>
              <li>
                <Link to="/top-charts" className="text-muted-foreground hover:text-primary">
                  Top Charts
                </Link>
              </li>
              <li>
                <Link to="/genres" className="text-muted-foreground hover:text-primary">
                  Genres
                </Link>
              </li>
              <li>
                <Link to="/artists" className="text-muted-foreground hover:text-primary">
                  Artists
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-primary">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/developers" className="text-muted-foreground hover:text-primary">
                  Developers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/copyright" className="text-muted-foreground hover:text-primary">
                  Copyright Info
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/licensing" className="text-muted-foreground hover:text-primary">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} MusicHub. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <p className="text-xs text-muted-foreground">Made with ♪ for music lovers everywhere</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
