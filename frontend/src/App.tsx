import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./Components/HomePage/Home"
import { Search } from "./Components/SearchPage/Search"
import { Library } from "./Components/LibraryPage/Library"
import { Favorites } from "./Components/FavoritesPage/Favorites"
import { Layout } from "./Components/Layouts/Layout"
import { OfflinePlayer } from "./Components/Offline/OfflinePlayer"
import { AuthProvider } from "./context/AuthContext" // ✅ import AuthProvider

export default function App() {
  return (
    <AuthProvider> {/* ✅ Wrap your app in AuthProvider */}
      <Router>
        <div className="flex min-h-screen flex-col">
          <Layout>
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/offline" element={<OfflinePlayer />} />
              </Routes>
            </main>
          </Layout>
        </div>
      </Router>
    </AuthProvider>
  )
}
