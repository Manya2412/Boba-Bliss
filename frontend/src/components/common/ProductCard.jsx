import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
    const {
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        getProductQuantity
    } = useCart();

    const quantity = getProductQuantity(product.id);

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">

            <div className="h-56 bg-[#FAF4EE] overflow-hiddem">
                {product.image}
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg text-boba-text">
                    {product.name}
                </h3>

                <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-bold text-boba-text">
                        ₹{product.price}
                    </span>
                </div>

                {quantity === 0 ? (
                    <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="w-full mt-4 border border-boba-primary text-boba-primary py-3 rounded-xl font-medium hover:bg-boba-primary hover:text-white transition"
                    >
                        Add To Cart
                    </button>
                ) : (
                    <div className="mt-4 flex items-center justify-between border border-boba-primary rounded-xl overflow-hidden">
                        <button
                            type="button"
                            onClick={() => decreaseQuantity(product.id)}
                            className="w-14 py-3 text-xl font-bold text-boba-primary hover:bg-pink-50 transition"
                            aria-label={`Decrease ${product.name} quantity`}
                        >
                            -
                        </button>

                        <span className="font-semibold text-lg">
                            {quantity}
                        </span>

                        <button
                            type="button"
                            onClick={() => increaseQuantity(product.id)}
                            className="w-14 py-3 text-xl font-bold text-boba-primary hover:bg-pink-50 transition"
                            aria-label={`Increase ${product.name} quantity`}
                        >
                            +
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductCard;