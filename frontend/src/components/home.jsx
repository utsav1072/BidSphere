import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";

function Home() {
    const notification = useSelector(state => state.auth.notification);
    const [showNotification, setShowNotification] = useState(true);
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const auctionRef = useRef(null);
    const categoryRef = useRef(null);

    useEffect(() => {
        if (notification) {
            setShowNotification(true);
            const timer = setTimeout(() => setShowNotification(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
        async function getAllItems() {
            try {
                const response = await axios.get("https://auctionhub.pythonanywhere.com/api/items/");
                setItems(response.data.items);
            } catch (error) {
                console.log(error);
            }
        }
        async function getAllcategory() {
            try {
                const response = await axios.get("https://auctionhub.pythonanywhere.com/api/category/");
                setCategory(response.data.categories);
            } catch (error) {
                console.log(error);
            }
        }
        getAllItems();
        getAllcategory();
    }, []);

    const scrollLeft = (ref) => {
        if (ref.current) {
            ref.current.scrollBy({ left: -ref.current.clientWidth / 2.5, behavior: "smooth" });
        }
    };

    const scrollRight = (ref) => {
        if (ref.current) {
            ref.current.scrollBy({ left: ref.current.clientWidth / 2.5, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100/60 via-white/80 to-purple-100/60 pb-20">
            {/* Featured Auctions */}
            <div className="flex justify-between items-center px-10 py-8 border-b border-gray-200 bg-white/70 backdrop-blur-lg">
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-500 drop-shadow">
                    Featured Auctions
                </h1>
                <button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition-all"
                    onClick={() => navigate(`/auction/all-items`)}
                >
                    View All
                </button>
            </div>

            <div className="relative px-10 py-8">
                {/* Left Arrow */}
                <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full border border-blue-100 hover:bg-blue-100 transition z-10"
                    onClick={() => scrollLeft(auctionRef)}
                >
                    <AiOutlineLeft size={28} className="text-blue-600" />
                </button>

                {/* Scrollable Auction Items */}
                <div
                    ref={auctionRef}
                    className="flex overflow-x-auto gap-8 scrollbar-hide scroll-smooth snap-x snap-mandatory w-full py-2"
                >
                    {items.length === 0 ? (
                        <div className="text-xl text-blue-700 font-semibold mx-auto mt-12">
                            No featured auctions found.
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white/90 shadow-xl rounded-2xl border border-blue-100 min-w-[70vw] sm:min-w-[40vw] md:min-w-[30vw] lg:min-w-[22vw] snap-center flex flex-col transition-all hover:shadow-2xl hover:-translate-y-2"
                                style={{ height: "420px", maxWidth: "350px" }} // Ensures all cards have the same height and width
                                >
                                {/* Card Image */}
                                <div className="relative w-full h-60 rounded-xl overflow-hidden flex-shrink-0">
                                    <img
                                    src={`https://auctionhub.pythonanywhere.com/media/${item.image_url}`}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                    <span className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs text-blue-700 font-semibold shadow">
                                    ₹{item.current_price}
                                    </span>
                                </div>
                                {/* Card Body */}
                                <div className="flex flex-col flex-1 px-2 py-3">
                                    <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 min-h-[28px]">{item.title}</h2>
                                    <p className="text-gray-600 text-sm mb-2 line-clamp-2 min-h-[40px]">{item.description}</p>
                                    <div className="flex-1" />
                                    <button
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 shadow transition-all mt-2"
                                    onClick={() => navigate(`/auction/item/${item.id}`)}
                                    >
                                    View Details
                                    </button>
                                </div>
                                </div>

                        ))
                    )}
                </div>
                {/* Right Arrow */}
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full border border-blue-100 hover:bg-blue-100 transition z-10"
                    onClick={() => scrollRight(auctionRef)}
                >
                    <AiOutlineRight size={28} className="text-blue-600" />
                </button>
            </div>

            {/* Auction Categories */}
            <div className="flex justify-between items-center px-10 py-8 border-b border-gray-200 bg-white/70 backdrop-blur-lg mt-10">
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500 drop-shadow">
                    Auction Categories
                </h1>
            </div>

            <div className="relative px-10 py-8">
                {/* Left Arrow */}
                <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full border border-purple-100 hover:bg-purple-100 transition z-10"
                    onClick={() => scrollLeft(categoryRef)}
                >
                    <AiOutlineLeft size={28} className="text-purple-600" />
                </button>

                {/* Scrollable Auction Categories */}
                <div
                    ref={categoryRef}
                    className="flex overflow-x-auto gap-8 scrollbar-hide scroll-smooth snap-x snap-mandatory w-full px-4 py-4"
                >
                    {category.length === 0 ? (
                        <div className="text-xl text-purple-700 font-semibold mx-auto mt-12">
                            No categories found.
                        </div>
                    ) : (
                        category.map((cat) => (
                            <div
                                key={cat.id}
                                className="h-40 w-64 min-w-[60vw] sm:min-w-[30vw] md:min-w-[18vw] border-2 border-purple-100 rounded-2xl shadow-lg 
                                bg-gradient-to-br from-blue-200 via-indigo-100 to-purple-100
                                flex items-center justify-center cursor-pointer 
                                hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform snap-center"
                                onClick={() => navigate(`/auction/category/${cat.category_name.toLowerCase()}`)}
                            >
                                <span className="text-black text-2xl font-bold tracking-wide drop-shadow-md">
                                    {cat.category_name}
                                </span>
                            </div>
                        ))
                    )}
                </div>

                {/* Right Arrow */}
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full border border-purple-100 hover:bg-purple-100 transition z-10"
                    onClick={() => scrollRight(categoryRef)}
                >
                    <AiOutlineRight size={28} className="text-purple-600" />
                </button>
            </div>
        </div>
    );
}

export default Home;
