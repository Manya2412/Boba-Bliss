import { useEffect, useState } from "react";

import orderService from "../../services/orderService";

function OrderManagement() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const data = await orderService.getAllOrders();
            setOrders(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (
        orderId,
        status
    ) => {

        try {
            await orderService.updateOrderStatus(
                orderId,
                status
            );

            setOrders((currentOrders) =>
                currentOrders.map((order) =>
                    order.id === orderId
                        ? { ...order, orderStatus: status, }
                        : order
                )
            );

        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="p-10">
                Loading orders...
            </div>
        );
    }

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-8">
                Order Management
            </h1>
            <div className="space-y-6">

                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white rounded-2xl shadow p-6"
                    >
                        <div className="flex justify-between items-start">
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

                            <div>
                                <select
                                    value={order.orderStatus}
                                    onChange={(event) =>
                                        handleStatusChange(
                                            order.id,
                                            event.target.value
                                        )
                                    }
                                    className="border rounded-lg px-4 py-2"
                                >
                                    <option value="PLACED">
                                        PLACED
                                    </option>

                                    <option value="PREPARING">
                                        PREPARING
                                    </option>

                                    <option value="OUT_FOR_DELIVERY">
                                        OUT FOR DELIVERY
                                    </option>

                                    <option value="DELIVERED">
                                        DELIVERED
                                    </option>

                                    <option value="CANCELLED">
                                        CANCELLED
                                    </option>
                                </select>

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

        </div>
    );
}

export default OrderManagement;
