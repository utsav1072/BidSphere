import { Routes, Route } from "react-router-dom";
import Signup from './components/signup'
import Header from './components/header'
import Home from './components/home'
import Footer from './components/footer'
import Profile from './components/profile'
import About from "./components/about";
import Categories from "./components/categories";
import Watchlist from "./components/watchlist";
import Aitemdetail from "./components/aitemdetail";
import Allitems from "./components/allitems";

function App() {
  return (
    <div className='bg-gradient-to-br from-gray-100 to-gray-300'>
            <Header /> {/* ✅ Navigation bar stays persistent on all pages */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/auction/" element={<Aitemdetail/>}/>
                <Route path="/auction/all-items" element={<Allitems/>}/>
                <Route path="/login" element={<Signup/>}/>
            </Routes>
            <Footer/>
    </div>

  )
}
export default App;
