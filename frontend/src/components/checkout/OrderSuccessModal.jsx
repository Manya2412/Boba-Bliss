import { Link } from "react-router-dom";
import {
    FaCheck,
    FaClipboardList,
} from "react-icons/fa";

import Modal from "../common/Modal";

function OrderSuccessModal({
    isopen,
    onClose,
    order,
}) {
    const orderId =
        order?.id ||
        order?.orderId ||
        order?.orderNumber ||
        "Processing";

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title=""
            maxwidth="max-w-md"
        >
            <div className="text-center">

                {/* Success icon */}
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-3xl text-white">
                        <FaCheck />
                    </div>
                </div>

                <h2 className="mt-7 font-heading text-4x1 text-boba-text">
                    Order Placed Successfully!
                </h2>

                <p className="mt-4 text-gray-600">
                    Thank you for choosing Boba Bliss.
                    Your delicious drinks are being prepared.
                </p>

                {/* Order information */}
                <div className="mt-7 rounded-2x1 bg-boba-cream p-5">
                    <p className="text-sm uppercase tracking-[2px] text-gray-500">
                        Order number
                    </p>

                    <p className="mt-2 text-2x1 font-bold text-boba-primary">
                        #{orderId}
                    </p>

                    {order?.totalAmount !== undefined && (
                        <div className="mt-4 flex justify-between border-t border-gray-300 pt-4">
                            <span className="text-gray-600">
                                Amount paid
                            </span>

                            <span className="font-bold">
                                ₹{order.totalAmount}
                            </span>
                        </div>
                    )}

                    {order?.orderStatus && (
                        <div className="mt-3 flex justify-between">
                            <span className="text-gray-600">
                                Status
                            </span>

                            <span className="font-semibold text-green-600">
                                {formatStatus(order.orderStatus)}
                            </span>
                        </div>
                    )}
                </div>

                <div className="mt-7 space-y-3">
                    <Link
                        to="/orders"
                        onClick={onClose}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-boba-primary py-4 font-semibold text-white trnasition hover:bg-boba-dark"
                    >
                        <FaClipboardList />
                        View My Orders
                    </Link>

                    <Link
                        to="/menu"
                        onClick={onClose}
                        className="block w-full rounded-x1 border border-boba-primary py-4 font-semibold text-boba-primary transition hover:bg-pink-50"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </Modal>
    );
}


function formatStatus(status) {
    return status
        .toLowerCase()
        .split("_")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
}

export default OrderSuccessModal;