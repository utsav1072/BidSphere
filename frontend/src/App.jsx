import { Routes, Route } from "react-router-dom";
import Signup from './components/signup'
import Header from './components/header'
import Home from './components/home'
import Footer from './components/footer'
import Profile from './components/profile'
import About from "./components/about";
import Categories from "./components/categories";
import Watchlist from "./components/watchlist";

function App() {
  return (
    <div className='bg-neutral-150'>
            <Header /> {/* ✅ Navigation bar stays persistent on all pages */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/categories" element={<Categories />} />
            </Routes>
            <Footer/>
    </div>

  )
}
export default App;
