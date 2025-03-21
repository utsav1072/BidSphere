import { ImHammer2 } from "react-icons/im";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logoutUser } from "../features/authentication/authSlice";

function Header() {
   // const authStatus = useSelector((state) => state.auth?.authTokens || false);    // Read state
    const { user, notification, error, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "About", slug: "/about", active: true },
        { name: "Profile", slug: "/profile", active: user },
        { name: "Watchlist", slug: "/watchlist", active: user },
        { name: "Categories", slug: "/categories", active: true },
        { name: "Login", slug:"/login", active: !user}
    ];

    return (
        <header className="h-[70px] bg-gray-800 shadow-md">
            <nav className="flex justify-between items-center px-10 py-4">
                <a className="flex items-center text-white" href="/">
                    <ImHammer2 className="mr-2 text-2xl text-yellow-400" />
                    <span className="text-xl font-bold">AuctionHub</span>
                </a>
                <div>
                    <ul className="flex items-center space-x-6">
                        {navItems.map(
                            (item) =>
                                item.active && (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => navigate(item.slug)}
                                            className="inline-block px-6 py-2 text-white transition duration-300 hover:bg-yellow-500 rounded-full"
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                )
                        )}
                        {user && (
                            <li>
                                <button className="px-4 py-2 text-white border border-yellow-400 rounded-full hover:bg-yellow-500 transition duration-300" onClick={() => dispatch(logoutUser())}>
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
