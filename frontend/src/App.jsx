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
import Singlecat from "./components/singlecat";
import Itemforbid from "./components/itemforbid";


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
                <Route path="/auction/item/:id" element={<Aitemdetail/>}/>
                <Route path="/auction/all-items" element={<Allitems/>}/>
                <Route path="/login" element={<Signup/>}/>
                <Route path="/auction/category/:cat" element={<Singlecat />} />
                <Route path="/itemforbid" element={<Itemforbid/>} />
            </Routes>
            <Footer/>
    </div>

  )
}
export default App;
