import { ImHammer2 } from "react-icons/im";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/authentication/authSlice";
import axios from "axios";

function Header() {
    const [searchItem, setSearchItem] = useState("");
    const [items, setItems] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (!searchItem.trim()) {
            setItems([]);
            setShowDropdown(false);
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
                setShowDropdown(true);
            } catch (error) {
                if (axios.isCancel(error)) {
                    // Request cancelled
                } else {
                    console.error("Error fetching data:", error);
                }
            }
        }, 400);

        return () => {
            clearTimeout(delayDebounce);
            controller.abort();
        };
    }, [searchItem]);

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "Profile", slug: "/profile", active: user },
        { name: "Watchlist", slug: "/watchlist", active: user },
        { name: "Add item for auction", slug: "/itemforbid", active: user },
        { name: "Login", slug: "/login", active: !user },
    ];

    return (
        <header className="sticky top-0 left-0 z-50 w-full backdrop-blur-md bg-white/80 shadow-lg border-b border-gray-200">
            <nav className="flex justify-between items-center px-4 md:px-10 py-3">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                    <ImHammer2 className="text-3xl text-yellow-500 drop-shadow" />
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-yellow-500 bg-clip-text text-transparent drop-shadow">
                        AuctionHub
                    </span>
                </div>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-md mx-6 hidden md:block">
                    <input
                        type="text"
                        placeholder="Search auctions..."
                        className="w-full h-10 px-4 border border-gray-300 rounded-xl bg-white/90 shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        onFocus={() => items.length > 0 && setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    />
                    {showDropdown && items.length > 0 && (
                        <ul className="absolute left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto animate-fade-in">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className="p-3 cursor-pointer hover:bg-yellow-50 transition-all text-gray-700"
                                    onMouseDown={() => {
                                        navigate(`/auction/item/${item.id}`);
                                        setShowDropdown(false);
                                        setSearchItem("");
                                    }}
                                >
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    <ul className="flex items-center space-x-2 md:space-x-4">
                        {navItems.map(
                            (item) =>
                                item.active && (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => navigate(item.slug)}
                                            className="px-4 py-2 text-gray-800 font-semibold rounded-full hover:bg-yellow-400/80 hover:text-white transition"
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                )
                        )}
                        {user && (
                            <li>
                                <button
                                    className="px-4 py-2 border border-yellow-500 text-yellow-700 font-semibold rounded-full hover:bg-yellow-500 hover:text-white transition"
                                    onClick={() => {
                                        dispatch(logoutUser());
                                        navigate('/');
                                    }}
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
