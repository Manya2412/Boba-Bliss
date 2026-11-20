import { useEffect, useState } from "react";
import productService from "../../services/productService";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Modal from "../../components/common/Modal";

const CATEGORIES = ["Milk Tea", "Fruit Tea", "Matcha", "Smoothies"];
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 8 * 1024 * 1024; 

const toImageSrc = (base64) => (base64 ? `data:image/png;base64,${base64}` : "");

const EMPTY_FORM = {
    name: "",
    category: CATEGORIES[0],
    price: "",
    image: "",
};

const inputClass =
    "w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-boba-primary";

function ProductForm({ initialValues, isEditing, saving, error, onSubmit, onClose }) {
    const [form, setForm] = useState(initialValues);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(toImageSrc(initialValues.image));
    const [fileError, setFileError] = useState("");

    useEffect(() => {
        if (!imageFile) return;

        const objectUrl = URL.createObjectURL(imageFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile]);

    const isIncomplete =
        saving ||
        !form.name.trim() ||
        !form.category ||
        !(Number(form.price) > 0) ||
        (!form.image && !imageFile);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            setFileError("Choose a JPG, PNG or WebP image.");
            e.target.value = "";
            return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            setFileError("Image must be 8 MB or smaller.");
            e.target.value = "";
            return;
        }

        setFileError("");
        setImageFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...form, imageFile });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-h-[70vh] overflow-y-auto p-1 space-y-4"
        >
            <div>
                <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                <input id="name" name="name" value={form.name} onChange={handleChange}
                    className={inputClass} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="category" className="block mb-1 font-medium">Category</label>
                    <select id="category" name="category" value={form.category}
                        onChange={handleChange} className={inputClass}>
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="price" className="block mb-1 font-medium">Price (₹)</label>
                    <input id="price" name="price" type="number" min="1" step="0.01"
                        value={form.price} onChange={handleChange} className={inputClass} required />
                </div>
            </div>

            <div>
                <label htmlFor="image" className="block mb-1 font-medium">Product image</label>

                <div className="flex items-center gap-4">
                    <div className="w-24 h-24 shrink-0 bg-[#FAF4EE] border border-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
                        {preview ? (
                            <img src={preview} alt="Product preview"
                                className="w-full h-full object-cover" />
                        ) : (
                            <div className="upload-icon w-full h-full flex items-center justify-center text-7xl">
                                🖼️
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <input id="image" type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleFileChange}
                            className="block w-full text-sm cursor-pointer file:mr-3 file:rounded-lg file:border-0 file:bg-boba-primary file:px-4 file:py-2 file:text-white file:cursor-pointer" />
                        <p className="mt-1 text-xs text-gray-500">
                            JPG, PNG or WebP.
                        </p>
                        {fileError && (
                            <p className="mt-1 text-sm text-red-600" role="alert">{fileError}</p>
                        )}
                    </div>
                </div>
            </div>

            {error && <p className="text-red-600 text-sm" role="alert">{error}</p>}

            <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose}
                    className="flex-1 border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 transition cursor-pointer">
                    Cancel
                </button>
                <button type="submit" disabled={isIncomplete}
                    className="flex-1 bg-boba-primary text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
                    {saving ? "Saving..." : isEditing ? "Save changes" : "Add product"}
                </button>
            </div>
        </form>
    );
}

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setPageError("");
            const data = await productService.getProducts();
            setProducts(data);
        } catch {
            setPageError("Could not load products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const openAddForm = () => {
        setEditingProduct(null);
        setFormError("");
        setShowForm(true);
    };

    const openEditForm = (product) => {
        setEditingProduct(product);
        setFormError("");
        setShowForm(true);
    };

    const closeForm = () => setShowForm(false);

    const handleSave = async (form) => {
        if (!form.name.trim() || !(Number(form.price) > 0)) {
            setFormError("Enter a name and a price greater than 0.");
            return;
        }

        try {
            setSaving(true);
            setFormError("");

            const payload = {
                name: form.name.trim(),
                category: form.category,
                price: Number(form.price),
                imageFile: form.imageFile,
            };

            if (editingProduct) {
                await productService.updateProduct(editingProduct.id, payload);
            } else {
                await productService.createProduct(payload);
            }

            await loadProducts();
            closeForm();
        } catch {
            setFormError("Could not save the product. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (product) => {
        if (!window.confirm(`Delete "${product.name}"? This can't be undone.`)) return;

        try {
            await productService.deleteProduct(product.id);
            setProducts((prev) => prev.filter((p) => p.id !== product.id));
        } catch {
            setPageError(`Could not delete "${product.name}". Please try again.`);
        }
    };

    const formValues = editingProduct
        ? {
            name: editingProduct.name ?? "",
            category: editingProduct.category ?? CATEGORIES[0],
            price: editingProduct.price ?? "",
            image: editingProduct.image ?? "",
        }
        : EMPTY_FORM;

    return (
        <>
            <Navbar />
            <div className="p-10 max-w-5xl mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold text-boba-text">Products</h1>
                    <button type="button" onClick={openAddForm}
                        className="bg-boba-dark text-white px-5 py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer">
                        Add product
                    </button>
                </div>

                {pageError && (
                    <p className="mt-4 text-red-600" role="alert">{pageError}</p>
                )}

                {loading ? (
                    <p className="mt-6 text-gray-500">Loading products...</p>
                ) : products.length === 0 ? (
                    <p className="mt-6 text-gray-500">
                        No products yet. Select "Add product" to create the first one.
                    </p>
                ) : (
                    <div className="mt-6 space-y-4">
                        {products.map((product) => (
                            <div key={product.id}
                                className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                                <div className="w-20 h-20 shrink-0 bg-[#FAF4EE] rounded-xl overflow-hidden flex items-center justify-center">
                                    {product.image && (
                                        <img
                                            src={toImageSrc(product.image)}
                                            alt={product.name}
                                            className="w-full h-full object-cover" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-lg text-boba-text truncate">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {product.category}
                                    </p>
                                    <p className="font-bold text-boba-text">₹{product.price}</p>
                                </div>

                                <div className="flex gap-2">
                                    <button type="button" onClick={() => openEditForm(product)}
                                        className="border border-red-500 text-red-600 px-4 py-2 rounded-xl font-medium hover:bg-boba-primary hover:text-white transition cursor-pointer"
                                        aria-label={`Update ${product.name}`}>
                                        Update
                                    </button>
                                    <button type="button" onClick={() => handleDelete(product)}
                                        className="border border-red-500 text-red-600 px-4 py-2 rounded-xl font-medium hover:bg-red-500 hover:text-white transition cursor-pointer"
                                        aria-label={`Delete ${product.name}`}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Modal
                isOpen={showForm}
                onClose={closeForm}
                title={editingProduct ? "Update product" : "Add product"}
            >
                {showForm && (
                    <ProductForm
                        initialValues={formValues}
                        isEditing={Boolean(editingProduct)}
                        saving={saving}
                        error={formError}
                        onSubmit={handleSave}
                        onClose={closeForm}
                    />
                )}
            </Modal>
            <Footer />
        </>
    );
}

export default ProductManagement;