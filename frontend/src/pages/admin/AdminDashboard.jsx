import { Link } from "react-router-dom";

function AdminDashboard() {
    return (
        <div className="min-h-screen p-10 bg-gray-100">
            <h1 className="text-4xl font-bold">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6 mt-8">

                <Link
                    to="/admin/products"
                    className="bg-white p-6 rounded-xl shadow"
                >
                    Products
                </Link>

                <Link
                    to="/admin/orders"
                    className="bg-white p-6 rounded-xl shadow"
                >
                    Orders
                </Link>

                <Link
                    to="/admin/users"
                    className="bg-white p-6 rounded-xl shadow"
                >
                    Users
                </Link>

            </div>
        </div>
    );
}

export default AdminDashboard;
