import { useEffect, useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import orderService from "../services/orderService";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [pageError, setPageError] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setPageError("");
            const data = await orderService.getMyOrder();
            setOrders(data);
        } catch {
            setPageError("Could not load orders. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const query = searchText.toLowerCase().trim();

    const filteredOrders = orders.filter((order) => {
        if (!query) return true;

        const searchableText = [
            order.id,
            order.phone,
            order.deliveryAddress,
            order.orderStatus?.replaceAll("_", " "),
            ...(order.items ?? []).map((item) => item.productName),
        ]
            .join(" ")
            .toLowerCase();

        return searchableText.includes(query);
    });

    return (
        <>
            <Navbar />
            <div className="p-10 max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h1 className="text-4xl font-bold text-boba-text">Orders</h1>

                    <div className="relative w-full sm:w-64">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="search"
                            value={searchText}
                            onChange={(event) => setSearchText(event.target.value)}
                            placeholder="Search orders..."
                            aria-label="Search orders"
                            className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-boba-primary focus:ring-2 focus:ring-pink-100"
                        />
                    </div>
                </div>

                {pageError && (
                    <p className="mt-4 text-red-600" role="alert">{pageError}</p>
                )}

                {loading ? (
                    <p className="mt-6 text-gray-500">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="mt-6 text-gray-500">
                        No orders yet.
                    </p>
                ) : filteredOrders.length === 0 ? (
                    <div className="mt-10 text-center">
                        <p className="text-gray-500">
                            No orders match "{searchText}".
                        </p>

                        <button
                            type="button"
                            onClick={() => setSearchText("")}
                            className="mt-4 border border-boba-primary text-boba-primary px-5 py-2 rounded-xl font-medium hover:bg-boba-primary hover:text-white transition cursor-pointer"
                        >
                            Clear search
                        </button>
                    </div>
                ) : (
                    <div className="mt-6 space-y-4">
                        {filteredOrders.map((order) => (
                            <div key={order.id}
                                className="bg-white rounded-2xl shadow p-6">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h2 className="text-xl font-bold">
                                            Order #{order.id}
                                        </h2>

                                        <p className="text-gray-500">
                                            {new Date(
                                                order.orderDate
                                            ).toLocaleString()}
                                        </p>

                                        <p className="mt-2">
                                            📞 {order.phone}
                                        </p>

                                        <p>
                                            📍 {order.deliveryAddress}
                                        </p>
                                    </div>

                                    <div className="relative shrink-0">
                                        order status
                                    </div>
                                </div>

                                <div className="mt-5 border-t pt-5">

                                    <h3 className="font-semibold mb-3">
                                        Ordered Items
                                    </h3>

                                    <div className="space-y-2">

                                        {order.items?.map((item) => (

                                            <div
                                                key={item.id}
                                                className="flex justify-between"
                                            >

                                                <span>
                                                    {item.productName}
                                                </span>

                                                <span>
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t mt-5 pt-5 flex justify-between">

                                    <span className="font-semibold">
                                        Total Amount
                                    </span>

                                    <span className="font-bold text-boba-primary">
                                        ₹{order.totalAmount}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Orders;