import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

import Signup from './components/signup';
import Header from './components/header';
import Home from './components/home';
import Footer from './components/footer';
import Profile from './components/profile';
import Watchlist from "./components/watchlist";
import Aitemdetail from "./components/aitemdetail";
import Allitems from "./components/allitems";
import Singlecat from "./components/singlecat";
import Itemforbid from "./components/itemforbid";
import Editprofile from "./components/editprofile";
import Useraucsummary from "./components/useraucsummary";
import Participated_bids from "./components/participated_bids";
import Forgotpassword from "./components/forgotpassword";

function App() {
  return (
    <div className='bg-gradient-to-br from-gray-100 to-gray-300'>
      <Header /> {/* ✅ Navigation bar stays persistent on all pages */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signup />} />
        <Route path="/auction/all-items" element={<Allitems />} />
        <Route path="/auction/category/:cat" element={<Singlecat />} />
        <Route path="/auction/item/:id" element={<Aitemdetail />} />
        <Route path="/reset-password/:uidb64/:token" element={<Forgotpassword />} />

        {/* Protected Routes (Requires Login) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/watchlist" element={<Watchlist />} /> 
          <Route path="/itemforbid" element={<Itemforbid />} />
          <Route path="/edit-profile" element={<Editprofile/>}/>
          <Route path="/profile/auction-summary" element={<Useraucsummary/>}/>
          <Route path="/profile/participated-bids" element={<Participated_bids/>}/>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
