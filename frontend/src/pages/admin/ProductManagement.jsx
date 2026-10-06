import { useEffect, useState }
    from "react";

import productService
    from "../../services/productService";

function ProductManagement() {

    const [products, setProducts] =
        useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {

        const data =
            await productService.getProducts();

        setProducts(data);
    };

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold">
                Products
            </h1>

            <div className="mt-6 space-y-4">

                {products.map((product) => (

                    <div
                        key={product.id}
                        className="bg-white p-4 rounded shadow flex justify-between"
                    >

                        <div>
                            <h3>{product.name}</h3>
                            <p>₹{product.price}</p>
                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ProductManagement;
