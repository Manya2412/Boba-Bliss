import { Link } from "react-router-dom";
import {
    FaCheck,
    FaClipboardList,
} from "react-icons/fa";

import Modal from "../common/Modal";

function OrderSuccessModal({
    isOpen,
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
            maxWidth="max-w-md"
        >
            <div className="text-center -mt-12">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-2xl text-white">
                        <FaCheck />
                    </div>
                </div>

                <h2 className="mt-4 font-heading text-4xl text-boba-text">
                    Order Placed Successfully!
                </h2>

                <p className="mt-4 text-gray-600">
                    Thank you for choosing Boba Bliss.
                    Your delicious drinks are being prepared.
                </p>

                <div className="mt-7 rounded-2xl bg-boba-cream p-5">
                    <p className="text-sm uppercase tracking-[2px] text-gray-500">
                        Order number
                    </p>

                    <p className="mt-2 text-2xl font-bold text-boba-primary">
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
                        className="block w-full rounded-xl border border-boba-primary py-4 font-semibold text-boba-primary transition hover:bg-pink-50"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </Modal>
    );
}

export default OrderSuccessModal;