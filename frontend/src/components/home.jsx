function Home() {
    return (
        <>
            <div className="flex justify-between items-center px-10 py-6 border-b border-gray-300">
                <h1 className="text-2xl font-semibold text-gray-800">Featured Auctions</h1>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition-all">
                    View All
                </button>
            </div>

            <div className="flex justify-between items-center p-8 gap-6">
                <div className="h-80 w-1/3 border-2 border-gray-300 rounded-2xl shadow-lg bg-white flex items-center justify-center">
                    <span className="text-gray-400">Auction Item</span>
                </div>
                <div className="h-80 w-1/3 border-2 border-gray-300 rounded-2xl shadow-lg bg-white flex items-center justify-center">
                    <span className="text-gray-400">Auction Item</span>
                </div>
                <div className="h-80 w-1/3 border-2 border-gray-300 rounded-2xl shadow-lg bg-white flex items-center justify-center">
                    <span className="text-gray-400">Auction Item</span>
                </div>
            </div>

            <div className="flex justify-between items-center px-10 py-6 border-b border-gray-300">
                <h1 className="text-2xl font-semibold text-gray-800">Auction Categories</h1>
            </div>

            <div className="flex justify-between items-center p-8 gap-6">
                <div className="h-40 w-1/3 border-2 border-gray-300 rounded-2xl shadow-md bg-white flex items-center justify-center">
                    <span className="text-gray-400">Category</span>
                </div>
                <div className="h-40 w-1/3 border-2 border-gray-300 rounded-2xl shadow-md bg-white flex items-center justify-center">
                    <span className="text-gray-400">Category</span>
                </div>
                <div className="h-40 w-1/3 border-2 border-gray-300 rounded-2xl shadow-md bg-white flex items-center justify-center">
                    <span className="text-gray-400">Category</span>
                </div>
            </div>
        </>
    );
}

export default Home;