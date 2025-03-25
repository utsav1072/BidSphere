import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import axios from "axios";

function Home() {
    const [items, setItems] = useState([]);
    const [category,setCategory] = useState([]);
    const navigate = useNavigate();
    const auctionRef = useRef(null);
    const categoryRef = useRef(null);

    useEffect(() => {
        async function getAllItems() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/items/");
                setItems(response.data.items); 
            } catch (error) {
                console.log(error);
            }
        }
        async function getAllcategory() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/category/");
                setCategory(response.data.category_name); 
            } catch (error) {
                console.log(error);
            }
        }
        getAllItems();
        getAllcategory()
    }, []);

    const scrollLeft = (ref) => {
        if (ref.current) {
            ref.current.scrollBy({ left: -ref.current.clientWidth / 3, behavior: "smooth" });
        }
    };

    const scrollRight = (ref) => {
        if (ref.current) {
            ref.current.scrollBy({ left: ref.current.clientWidth / 3, behavior: "smooth" });
        }
    };

    return (
        <>
            {/* Featured Auctions */}
            <div className="flex justify-between items-center px-10 py-6 border-b border-gray-300">
                <h1 className="text-2xl font-semibold text-gray-800">Featured Auctions</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition-all"
                    onClick={() => navigate(`/auction/all-items`)}
                >
                    View All
                </button>
            </div>

            <div className="relative px-10">
                {/* Left Arrow */}
                <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 z-10"
                    onClick={() => scrollLeft(auctionRef)}
                >
                    <AiOutlineLeft size={24} />
                </button>

                {/* Scrollable Auction Items */}
                <div ref={auctionRef} className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth snap-x snap-mandatory w-full">
                    {items.map((item) => (
                        <div
                        key={item.id}
                        className="h-90 w-1/3 min-w-[30%] border-2 border-gray-300 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition-all snap-center overflow-hidden relative"
                        onClick={() => navigate(`/auction/item/${item.id}`)}
                       >
                            {/* Background Image */}
                            <img
                            src={item.image_url}
                            alt={item.title}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                        
                            {/* Title at the Bottom */}
                            <div className="absolute h-12 bottom-0 left-0 w-full bg-amber-50 bg-opacity-90 text-black px-4 py-2 text-center font-semibold text-lg tracking-wide">
                                {item.title}
                            </div>
                      </div>
                      
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 z-10"
                    onClick={() => scrollRight(auctionRef)}
                >
                    <AiOutlineRight size={24} />
                </button>
            </div>

            {/* Auction Categories */}
            <div className="flex justify-between items-center px-10 py-6 border-b border-gray-300">
                <h1 className="text-2xl font-semibold text-gray-800">Auction Categories</h1>
            </div>

            <div className="relative px-10">
                {/* Left Arrow */}
                <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 z-10"
                    onClick={() => scrollLeft(categoryRef)}
                >
                    <AiOutlineLeft size={24} />
                </button>

                {/* Scrollable Auction Categories */}
                <div ref={categoryRef} className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth snap-x snap-mandatory w-full">
                    {category.map((cat, index) => (
                        <div
                            key={index}
                            className="h-40 w-1/3 min-w-[30%] border-2 border-gray-300 rounded-2xl shadow-md bg-white flex items-center justify-center cursor-pointer hover:shadow-xl transition-all snap-center"
                            onClick={() => navigate(`/auction/category/${cat}`)}
                        >
                            <span className="text-gray-400">{cat}</span>
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 z-10"
                    onClick={() => scrollRight(categoryRef)}
                >
                    <AiOutlineRight size={24} />
                </button>
            </div>
        </>
    );
}

export default Home;
