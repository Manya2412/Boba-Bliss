
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

const DELIVERY_FEE = 20;
const COUPON_CODE = "BOBA20";
const COUPON_DISCOUNT = 20;

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [couponApplied, setCouponApplied] = useState(false);

    const addToCart = (product) => {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...currentItems, { ...product, quantity: 1 }];
        });
    };

    const increaseQuantity = (productId) => {
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (productId) => {
        setCartItems((currentItems) =>
            currentItems.filter((item) => item.id !== productId)
        );
    };

    const clearCart = () => {
        setCartItems([]);
        setCouponApplied(false);
    };

    const getProductQuantity = (productId) => {
        const product = cartItems.find(
            (item) => item.id === productId
        );

        return product ? product.quantity : 0;
    };

    // Calculate the number of items in the cart.
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Calculate subtotal from prices and quantities.
    const subtotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );

    // Delivery costs ₹20 whenever the cart contains items.
    const deliveryFee = cartItems.length > 0 ? DELIVERY_FEE : 0;

    // Apply the discount only after a valid coupon is applied.
    const discountPercentage =
        couponApplied && cartItems.length > 0
            ? COUPON_DISCOUNT
            : 0;

    const discountAmount =
        subtotal * (discountPercentage / 100);

    const totalAmount = Math.max(
        0,
        subtotal - discountAmount + deliveryFee
    );

    const applyCoupon = (code) => {
        if (cartItems.length === 0) {
            return {
                success: false,
                message: "Add items to your cart before applying a coupon.",
            };
        }

        if (code.trim().toUpperCase() !== COUPON_CODE) {
            return {
                success: false,
                message: "Invalid coupon code.",
            };
        }

        setCouponApplied(true);

        return {
            success: true,
            message: "Coupon applied! You saved 20%.",
        };
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                subtotal,
                discountPercentage,
                discountAmount,
                deliveryFee,
                totalAmount,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                getProductQuantity,
                removeFromCart,
                clearCart,
                applyCoupon,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
}