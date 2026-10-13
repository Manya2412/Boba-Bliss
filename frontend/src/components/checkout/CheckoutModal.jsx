import { useEffect, useState } from "react";
import {
    FaHome,
    FaMoneyBillWave,
    FaPhone,
} from "react-icons/fa";

import Modal from "../common/Modal";
import orderService from "../../services/orderService";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { getApiError } from "../../utils/getApiError";

function CheckoutModal({
    isOpen,
    onClose,
    onOrderSuccess,
}) {
    const { user, updateUser } = useAuth();

    const {
        cartItems,
        discountPercentage,
        clearCart,
    } = useCart();

    const [formData, setFormData] = useState({
        phone: "",
        deliveryAddress: "",
        paymentMethod: "CASH_ON_DELIVERY",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isOpen && user) {
            setFormData({
                phone: user.phone || "",
                deliveryAddress: user.address || "",
                paymentMethod: "CASH_ON_DELIVERY",
            });

            setErrorMessage("");
        }
    }, [isOpen, user]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({ ...currentData, [name]: value, }));

        setErrorMessage("");
    };

    const validateForm = () => {
        if (!/^\d{10}$/.test(formData.phone.trim())) {
            return "Enter a valid 10-digit phone number";
        }

        if (!formData.deliveryAddress.trim()) {
            return "Delivery address is required";
        }

        if (cartItems.length === 0) {
            return "Your cart is empty";
        }

        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationError = validateForm();

        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setIsSubmitting(true);
        setErrorMessage("");

        const checkoutData = {
            phone: formData.phone.trim(),
            deliveryAddress: formData.deliveryAddress.trim(),
            paymentMethod: formData.paymentMethod,
            couponCode: discountPercentage > 0 ? "BOBA20" : null,
        };

        try {
            const createdOrder = await orderService.placeOrder(checkoutData);

            updateUser({
                ...user,
                phone: checkoutData.phone,
                address: checkoutData.deliveryAddress,
            });

            clearCart();
            onClose();

            if (onOrderSuccess) {
                onOrderSuccess(createdOrder);
            }
        } catch (error) {
            setErrorMessage(
                getApiError(
                    error,
                    "Unable to place your order"
                )
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Complete Checkout"
            maxwidth="max-w-2x1"
        >

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {errorMessage && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {errorMessage}
                    </div>
                )}

                <div>
                    <label
                        htmlFor="checkout-phone"
                        className="block mb-2 text-sm font-semibold text-gray-700"
                    >
                        Phone Number
                    </label>

                    <div className="relative">
                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            id="checkout-phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter 10-digit phone number"
                            maxLength={10}
                            autoComplete="tel"
                            className="w-full rounded-x1 border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-boba-primary focus:ring-2 focus-ring-pink-100"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="checkout-address"
                        className="block mb-2 text-sm font-semibold text-gray-700"
                    >
                        Delivery Address
                    </label>

                    <div className="relative">
                        <FaHome className="absolute left-4 top-4 text-gray-400" />

                        <textarea
                            id="checkout-address"
                            name="deliveryAddress"
                            value={formData.deliveryAddress}
                            onChange={handleChange}
                            placeholder="Enter complete delivery address"
                            rows={2}
                            autoComplete="street-address"
                            className="w-full resize-none rounded-x1 border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-boba-primary focus:ring-2 focus-ring-pink-100"
                        />
                    </div>
                </div>

                <div>
                    <p className="mb-3 text-sm font-semibold text-gray-700">
                        Payment method
                    </p>

                    <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-boba-primary bg-pink-50 p-4">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="CASH_ON_DELIVERY"
                            checked={formData.paymentMethod === "CASH_ON_DELIVERY"}
                            onChange={handleChange}
                            className="accent-boba-primary"
                        />

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-boba-primary">
                            <FaMoneyBillWave />
                        </div>

                        <div>
                            <p className="font-semibold">
                                Cash on Delivery
                            </p>

                            <p className="text-sm text-gray-500">
                                Pay when the order arrives.
                            </p>
                        </div>
                    </label>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1 rounded-x1 border border-gray-300 py-4 font-semibold hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                    >
                        Back to Cart
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 rounded-x1 bg-boba-primary py-4 font-semibold text-white transition hover:bg-boba-dark disabled:cursor-not-allowed disabled:bg-gray-300 cursor-pointer"
                    >
                        {isSubmitting
                            ? "Placing Order..."
                            : "Confirm Order"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default CheckoutModal;