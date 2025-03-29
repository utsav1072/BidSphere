import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function Home() {
    const notification = useSelector(state => state.auth.notification);
    const [showNotification, setShowNotification] = useState(true);
    const [items, setItems] = useState([]);
    const [category,setCategory] = useState([]);
    const navigate = useNavigate();
    const auctionRef = useRef(null);
    const categoryRef = useRef(null);

    useEffect(() => {
        if (notification) {
            setShowNotification(true);
            const timer = setTimeout(() => setShowNotification(false), 2000);
            return () => clearTimeout(timer); // Cleanup timeout
        }
    }, [notification]);

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
                setCategory(response.data.categories); 
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
                        <div key={item.id} className="bg-white shadow-lg rounded-xl p-4 border min-w-[25%] md:min-w-[30%] lg:min-w-[22%] snap-center">
                            <img 
                                src={item.image_url} 
                                alt={item.title} 
                                className="w-full h-60 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-xl font-semibold">{item.title}</h2>
                            <p className="text-gray-600">{item.description}</p>
                            <p className="text-blue-600 font-bold mt-2">Price: ₹{item.current_price}</p>
                            <button 
                                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all" 
                                onClick={() => navigate(`/auction/item/${item.id}`)}
                            >
                                View Details
                            </button>
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
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md hover:bg-gray-400 z-10 transition-all"
                    onClick={() => scrollLeft(categoryRef)}
                >
                    <AiOutlineLeft size={24} />
                </button>

                {/* Scrollable Auction Categories */}
                <div
                    ref={categoryRef}
                    className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth snap-x snap-mandatory w-full px-4 py-4"
                >
                {category.map((cat) => (
                    <div
                        key={cat.id}
                        className="h-40 w-1/4 min-w-[25%] border-2 border-gray-200 rounded-2xl shadow-lg 
                        bg-gradient-to-br from-blue-200 via-indigo-100 to-purple-50
                        flex items-center justify-center cursor-pointer 
                        hover:shadow-2xl hover:scale-110 transition-all duration-300 ease-in-out transform snap-center"
                        onClick={() => navigate(`/auction/category/${cat.category_name.toLowerCase()}`)}
                    >
                        <span className="text-black text-xl tracking-wide drop-shadow-md">
                            {cat.category_name}
                        </span>
                    </div>
                ))}

                </div>

                {/* Right Arrow */}
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md hover:bg-gray-400 z-10 transition-all"
                    onClick={() => scrollRight(categoryRef)}
                >
                    <AiOutlineRight size={24} />
                </button>
            </div>            
        </>
    );
}


export default Home;
