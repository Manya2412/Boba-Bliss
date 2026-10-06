import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaCopy,
  FaGift,
  FaShoppingBag,
  FaTrash,
} from "react-icons/fa";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import LoginModal from "../components/auth/LoginModal";
import RegisterModal from "../components/auth/RegisterModal";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CheckoutModal from "../components/checkout/CheckoutModal";
import OrderSuccessModal from "../components/checkout/OrderSuccessModal";

function Cart() {
  const {
    cartItems,
    subtotal,
    discountPercentage,
    discountAmount,
   deliveryFee,
    totalAmount,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    applyCoupon,
  } = useCart();

  const { isAuthenticated } = useAuth();

  const [couponCode, setCouponCode] =
   useState("");

  const [couponMessage, setCouponMessage] =
    useState("");

  const [couponSuccess, setCouponSuccess] =
    useState(false);

  const [copied, setCopied]= useState(false);

  const [showLoginModal, setShowLoginModal] =
   useState(false);

  const [
    showRegisterModal,
    setShowRegisterModal,
  ] = useState(false);

  const copyCoupon = async () => {
   try {
      await navigator.clipboard.writeText(
        "BOBA20"
      );

      setCouponCode("BOBA20");
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCouponCode("BOBA20");
    }
  };

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode);

    setCouponSuccess(result.success);
    setCouponMessage(result.message);
  };

  const beginCheckout = () => {
  if (!isAuthenticated) {
    setShowLoginModal(true);
    return;
  }

  setShowCheckoutModal(true);
};

const continueAfterAuthentication = () => {
  setShowLoginModal(false);
  setShowRegisterModal(false);
  setShowCheckoutModal(true);
};

  const openLoginModal = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const openRegisterModal = () => {
  setShowLoginModal(false);
  setShowRegisterModal(true);
};

const handleOrderSuccess = (
  createdOrder
) => {
  setPlacedOrder(createdOrder);
  setShowCheckoutModal(false);
  setShowOrderSuccessModal(true);
};
  const [
  showCheckoutModal,
  setShowCheckoutModal,
] = useState(false);

const [
  showOrderSuccessModal,
  setShowOrderSuccessModal,
] = useState(false);

const [placedOrder, setPlacedOrder] =
  useState(null);


  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        <section className="max-w-7xl mx-auto px-6 py-10">

          {/* Discount banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-boba-primary to-boba-dark rounded-3xl p-7 md:p-10 text-white shadow-lg">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full" />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/20 text-2xl">
                  <FaGift />
                </div>

                <div>
                  <p className="uppercase tracking-[3px] text-sm font-semibold">
                    Special offer
                  </p>

                  <h2 className="font-heading text-3xl md:text-4xl mt-1">
                    Get 20% off your order
                  </h2>

                  <p className="mt-2 text-white/85">
                    Copy the coupon and apply it below.
                  </p>
                </div>
              </div>

              <div className="flex items-center bg-white rounded-xl p-2">
                <span className="px-5 font-bold tracking-wider text-boba-primary">
                  BOBA20
                </span>

                <button
                  type="button"
                  onClick={copyCoupon}
                  className="flex items-center gap-2 px-5 py-3 bg-boba-primary text-white rounded-lg hover:bg-boba-dark"
                >
                  {copied ? <FaCheck /> : <FaCopy />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="mt-12">
            <p className="text-boba-primary uppercase tracking-[3px] font-semibold">
              Your order
            </p>

            <h1 className="font-heading text-5xl mt-2">
              Shopping Cart
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid lg:grid-cols-[1fr_390px] gap-10 mt-10">

              {/* Cart products */}
              <div className="border border-gray-200 rounded-3xl px-6 lg:px-8">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-gray-200 last:border-b-0 py-6"
                  >
                    <div className="w-full sm:w-28 h-28 bg-boba-cream rounded-2xl overflow-hidden flex-shrink-0">
                      {item.image}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-gray-500">
                        ₹{item.price} each
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="mt-3 flex items-center gap-2 text-sm text-red-500"
                      >
                        <FaTrash />
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="flex items-center border border-boba-primary rounded-xl overflow-hidden">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="w-11 h-11 text-xl text-boba-primary hover:bg-pink-50"
                        >
                          −
                        </button>

                        <span className="min-w-10 text-center font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="w-11 h-11 text-xl text-boba-primary hover:bg-pink-50"
                        >
                          +
                        </button>
                      </div>

                      <p className="w-24 text-right text-lg font-bold">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <aside className="bg-boba-cream rounded-3xl p-6 lg:p-8 h-fit lg:sticky lg:top-28">
                <h2 className="font-heading text-3xl">
                  Order Summary
                </h2>

                <div className="mt-6 flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(event) =>
                      setCouponCode(
                        event.target.value
                      )
                    }
                    placeholder="Coupon code"
                    className="min-w-0 flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:border-boba-primary"
                  />

                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-5 py-3 bg-white border border-boba-primary text-boba-primary rounded-xl font-semibold hover:bg-boba-primary hover:text-white"
                  >
                    Apply
                  </button>
                </div>

                {couponMessage && (
                  <p
                    className={`mt-2 text-sm ${
                      couponSuccess
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {couponMessage}
                  </p>
                )}

                <div className="mt-7 space-y-4">
                  <SummaryRow
                    label="Subtotal"
                    value={`₹${subtotal}`}
                  />

                  <SummaryRow
                    label={
                      discountPercentage > 0
                        ? `Discount (${discountPercentage}%)`
                        : "Discount"
                    }
                    value={`− ₹${discountAmount}`}
                    valueClass="text-green-600"
                  />

                  <SummaryRow
                    label="Delivery fee"
                    value={`₹${deliveryFee}`}
                  />
                </div>

                <div className="border-t border-gray-300 mt-6 pt-6 flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    Total
                  </span>

                  <span className="text-3xl font-bold text-boba-primary">
                    ₹{totalAmount}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={beginCheckout}
                  className="w-full mt-7 py-4 bg-boba-primary text-white rounded-xl font-semibold hover:bg-boba-dark transition"
                >
                  Place Order
                </button>
              </aside>

            </div>
          )}
        </section>
      </main>

      <Footer />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() =>
          setShowLoginModal(false)
        }
        onOpenRegister={openRegisterModal}
        onLoginSuccess={
          continueAfterAuthentication
        }
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() =>
          setShowRegisterModal(false)
        }
        onOpenLogin={openLoginModal}
        onRegisterSuccess={
          continueAfterAuthentication
        }
      />

      <CheckoutModal
  isOpen={showCheckoutModal}
  onClose={() =>
    setShowCheckoutModal(false)
  }
  onOrderSuccess={handleOrderSuccess}
/>

<OrderSuccessModal
  isOpen={showOrderSuccessModal}
  onClose={() =>
    setShowOrderSuccessModal(false)
  }
  order={placedOrder}
/>
    </>
  );
}

function EmptyCart() {
  return (
    <div className="py-24 text-center">
      <div className="w-24 h-24 mx-auto bg-boba-cream rounded-full flex items-center justify-center text-boba-primary text-4xl">
        <FaShoppingBag />
      </div>

      <h2 className="font-heading text-4xl mt-7">
        Your cart is empty
      </h2>

      <p className="mt-3 text-gray-500">
        Add some delicious drinks from our menu.
      </p>

      <Link
        to="/menu"
        className="inline-block mt-7 bg-boba-primary text-white px-8 py-4 rounded-xl hover:bg-boba-dark"
      >
        Explore Menu
      </Link>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  valueClass = "",
}) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">
        {label}
      </span>

      <span className={`font-semibold ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}

export default Cart;
