import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function UserDropdown() {
    const [open, setOpen] = useState(false);

    const { user, logout } = useAuth();

    const isAdmin = user?.role === "ROLE_ADMIN";

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="font-semibold text-boba-primary"
            >
                Hi, {user?.fullName?.split(" ")[0]} ▼
            </button>

            {open && (
                <div className="absolute right-0 mt-3 bg-white shadow-lg rounded-xl w-56 border z-50">
                    <div className="p-4 border-b">
                        <h3 className="font-semibold">
                            {user?.fullName}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {user?.email}
                        </p>
                    </div>

                    {/* User Menu */}
                    {!isAdmin && (
                        <>
                            <Link
                                to="/profile"
                                onClick={() => setOpen(false)}
                                className="block px-4 py-3 hover:bg-gray-50"
                            >
                                My profile
                            </Link>

                            <Link
                                to="/orders"
                                onClick={() => setOpen(false)}
                                className="block px-4 py-3 hover:bg-gray-50"
                            >
                                My Orders
                            </Link>
                        </>
                    )}

                    {/* Admin Menu */}
                    {isAdmin && (
                        <>
                            <Link
                                to="/admin/orders"
                                onClick={() => setOpen(false)}
                                className="block px-4 py-3 hover:bg-gray-50"
                            >
                                Orders
                            </Link>

                            <Link
                                to="/admin/products"
                                onClick={() => setOpen(false)}
                                className="block px-4 py-3 hover:bg-gray-50"
                            >
                                Items
                            </Link>
                        </>
                    )}

                    <button
                        onClick={() => {
                            logout();
                            setOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-50"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserDropdown;