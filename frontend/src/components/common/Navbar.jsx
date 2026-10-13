import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useRef } from "react";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import UserDropdown from "../common/UserDropdown";
import logo from "../../assets/icons/logo.png";

function Navbar({ openLogin, openRegister }) {
    const { cartCount } = useCart();

    const { isAuthenticated } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const pendingSection = useRef(null);

    useEffect(() => {
        if (location.pathname === "/" && pendingSection.current) {
            const sectionId = pendingSection.current;
            pendingSection.current = null;

            requestAnimationFrame(() => {
                document.getElementById(sectionId)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            });
        }
    }, [location.pathname]);

    const scrollToSection = (sectionId) => {
        if (location.pathname !== "/") {
            pendingSection.current = sectionId;
            navigate("/");
            return;
        }

        document.getElementById(sectionId)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 lg:px-14">
                <div className="h-20 flex items-center justify-between">

                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Comapny logo" width={65} height={70} />

                        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-boba-brown">
                            BOBA BLISS
                        </h1>
                    </Link>

                    <div className="hidden md:flex gap-6 font-medium text-xl text-gray-700">
                        <Link to="/" className="hover:text-boba-primary transition">
                            Home
                        </Link>

                        <Link to="/menu" className="hover:text-boba-primary transition">
                            Menu
                        </Link>

                        <button
                            type="button"
                            onClick={() => scrollToSection("about")}
                            className="hover:text-boba-primary transition cursor-pointer"
                        >
                            About
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection("features")}
                            className="hover:text-boba-primary transition cursor-pointer"
                        >
                            Features
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection("contact")}
                            className="hover:text-boba-primary transition cursor-pointer"
                        >
                            Contact
                        </button>
                    </div>

                    <div className="flex items-center gap-5">

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
                                    className="hidden lg:block px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                                >
                                    Login
                                </button>

                                <button
                                    onClick={openRegister}
                                    className="hidden lg:block px-5 py-2 rounded-lg bg-boba-primary text-white hover:bg-boba-dark transition cursor-pointer"
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