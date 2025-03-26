import { ImHammer2 } from "react-icons/im";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/authentication/authSlice";
import axios from "axios";

function Header() {
    const [searchItem, setSearchItem] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!searchItem.trim()) {
            setItems([]); // Clear results if search is empty
            return;
        }
        const controller = new AbortController();
        const delayDebounce = setTimeout(async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/items/search/?q=${searchItem}`,
                    { signal: controller.signal }
                );
                setItems(response.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled:", error.message);
                } else {
                    console.error("Error fetching data:", error);
                }
            }
        }, 500);

        return () => {
            clearTimeout(delayDebounce);
            controller.abort(); // Cancel previous request
        };
    }, [searchItem]);

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "Profile", slug: "/profile", active: user },
        { name: "Watchlist", slug: "/watchlist", active: user },
        { name: "Categories", slug: "/categories", active: true },
        { name: "Login", slug: "/login", active: !user },
    ];

    return (
        <header className="h-[70px] bg-gray-800 shadow-md w-full top-0 left-0 z-50">
            <nav className="flex justify-between items-center px-6 md:px-10 py-4">
                {/* Left: Logo Section */}
                <div className="flex justify-start items-center">
                    <a className="flex items-center text-white space-x-2" href="/">
                        <ImHammer2 className="text-2xl text-yellow-400" />
                        <span className="text-xl font-bold">AuctionHub</span>
                    </a>
                </div>

                {/* Middle: Search Bar (only visible on medium+ screens) */}
                <div className="relative flex-1 max-w-sm mx-auto hidden md:block">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full h-8 px-3 border bg-amber-50 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={(e) => setSearchItem(e.target.value)}
                    />
                    {items.length > 0 && (
                        <ul className="absolute left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className="p-2 cursor-pointer hover:bg-gray-100 transition-all"
                                    onClick={() => navigate(`/auction/item/${item.id}`)}
                                >
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Right: Navigation Items */}
                <div className="flex justify-end items-center space-x-4">
                    <ul className="flex items-center space-x-4">
                        {navItems.map(
                            (item) =>
                                item.active && (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => navigate(item.slug)}
                                            className="px-4 py-2 text-white transition duration-300 hover:bg-yellow-500 rounded-full"
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                )
                        )}
                        {user && (
                            <li>
                                <button
                                    className="px-4 py-2 text-white border border-yellow-400 rounded-full hover:bg-yellow-500 transition duration-300"
                                    onClick={() => dispatch(logoutUser())}
                                >
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
