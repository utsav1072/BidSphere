function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-10 shadow-inner">
            <div className="container mx-auto flex justify-between items-center px-10">
                <div>
                    <h2 className="text-lg font-semibold text-yellow-400">About Us</h2>
                    <p className="text-sm text-gray-300 mt-2 w-80">
                        AuctionHub is your go-to platform for seamless and transparent auctions.
                        We provide a secure and user-friendly experience for buyers and sellers alike.
                    </p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-yellow-400">Quick Links</h2>
                    <ul className="mt-2 space-y-2 text-sm">
                        <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
                        <li><a href="/about" className="hover:text-yellow-400 transition">About</a></li>
                        <li><a href="/categories" className="hover:text-yellow-400 transition">Categories</a></li>
                        <li><a href="/contact" className="hover:text-yellow-400 transition">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-gray-400 text-sm mt-6 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} AuctionHub. All Rights Reserved.
            </div>
        </footer>
    );
}

export default Footer;