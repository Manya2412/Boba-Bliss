import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Modal from "../common/Modal";
import { useAuth } from "../../context/AuthContext";
import { getApiError } from "../../utils/getApiError";

function LoginModal({
    isopen,
    onClose,
    onOpenRegister,
    onLoginSuccess,
}) {
    const { login, isLoading } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",

    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({ ...currentData, [name]: value, }));

        setErrorMessage("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        if (!formData.email.trim()) {
            setErrorMessage("Email is required");
            return;
        }

        if (!formData.password) {
            setErrorMessage("Password is required");
            return;
        }

        try {
            await login(formData);

            setFormData({ email: "", password: "", });
            onClose();

            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } catch (error) {
            setErrorMessage(getApiError(error, "Invalid email or password"));
        }
    };

    const openRegister = () => {
        setErrorMessage("");
        onClose();
        onOpenRegister();
    };

    return (
        <Modal
            isOpen={isopen}
            onClose={onClose}
            title="Welcome Back"
        >
            <p className="text-gray-600 mb-6">
                Login to continue with your Boba Bliss order.
            </p>

            {errorMessage && (
                <div className="mb-5 rounded-x1 bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                    {errorMessage}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Email */}
                <div>
                    <label
                        htmlFor="login-email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Email address
                    </label>

                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            id="login-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-boba-primary focus:ring-2 focus:ring-pink-100"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor="login-password"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Password
                    </label>

                    <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            id="login-password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-boba-primary focus:ring-2 focus:ring-pink-100"

                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-boba-primary text-white rounded-xl font-semibold hover:bg-boba-dark transition dosabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form >

            <p className="mt-6 text-center text-gray-600">
                New to Boba Bliss?{" "}

                <button
                    type="button"
                    onClick={openRegister}
                    className="text-boba-primary font-semibold hover:underline"
                >
                    Register now
                </button>
            </p>
        </Modal >
    );
}

export default LoginModal;