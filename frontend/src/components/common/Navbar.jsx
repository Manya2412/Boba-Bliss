import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import UserDropdown from "../common/UserDropdown";

function Navbar({ openLogin, openRegister }) {
    const { cartCount } = useCart();

    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 lg:px-14">
                <div className="h-20 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <span className="text-3xl">logo</span>

                        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-boba-brown">
                            BOBA BLISS
                        </h1>
                    </Link>

                    {/* Navigation */}
                    <div className="hidden md:flex gap-10 font-medium text-gray-700">
                        <Link to="/" className="hover:text-boba-primary transition">
                            Home
                        </Link>

                        <Link to="/menu" className="hover:text-boba-primary transition">
                            Menu
                        </Link>

                        <Link to="/#about" className="hover:text-boba-primary transition">
                            About
                        </Link>

                        <Link to="/#features" className="hover:text-boba-primary transition">
                            Features
                        </Link>

                        <Link to="/#contact" className="hover:text-boba-primary transition">
                            Contact
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-5">
                        <button
                            type="button"
                            aria-label="Search"
                            className="hover:text-boba-primary transition"
                        >
                            <FaSearch className="text-xl" />
                        </button>

                        <Link
                            to="/cart"
                            className="relative hover:text-boba-primary transition"
                            aria-label={`Cart with ${cartCount}items`}
                        >
                            <FaShoppingCart className="text-xl" />

                            {cartCount > 0 && (
                                <span className="absolute -top-3 -right-3 bg-boba-primary text-white text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {!isAuthenticated ? (
                            <>
                                <button
                                    onClick={openLogin}
                                    className="hidden lg:block px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                                >
                                    Login
                                </button>

                                <button
                                    onClick={openRegister}
                                    className="hidden lg:block px-5 py-2 rounded-lg bg-boba-primary text-white hover:bg-boba-dark transition"
                                >
                                    Register
                                </button>
                            </>
                        ) : (
                            <UserDropdown />
                        )
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;