import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Downloads } from "./Components/DownloadsPage/Downloads"
import { Home } from "./Components/HomePage/Home"
import { Search } from "./Components/SearchPage/Search"
import { Library } from "./Components/LibraryPage/Library"
import { Favorites } from "./Components/FavoritesPage/Favorites"
import { Layout } from ".//Components/Layouts/Layout"

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Layout>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/library" element={<Library />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        </Layout>
      </div>
    </Router>
  )
}
