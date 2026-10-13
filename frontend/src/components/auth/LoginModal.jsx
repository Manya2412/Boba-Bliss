import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "../common/Modal";
import { useAuth } from "../../context/AuthContext";
import { getApiError } from "../../utils/getApiError";

function LoginModal({
    isOpen,
    onClose,
    onOpenRegister,
    onLoginSuccess,
}) {
    const { login, isLoading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

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

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email.trim())) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        if (formData.password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
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
            isOpen={isOpen}
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
                            placeholder="user@bobabliss.com"
                            autoComplete="email"
                            className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-xl outline-none focus:border-boba-primary focus:ring-2 focus:ring-pink-100"
                        />
                    </div>
                </div>

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
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            className="w-full pl-11 pr-12 py-2 border border-gray-300 rounded-xl outline-none focus:border-boba-primary focus:ring-2 focus:ring-pink-100"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((current) => !current)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-boba-primary cursor-pointer"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={
                        isLoading ||
                        !formData.email.trim() ||
                        !formData.password
                    }

                    className={`w-full py-3 text-white rounded-xl font-semibold transition ${isLoading ||
                        !formData.email.trim() ||
                        !formData.password
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-boba-primary hover:bg-boba-dark cursor-pointer"
                        }`}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>

            </form >

            <p className="mt-6 text-center text-gray-600">
                New to Boba Bliss?{" "}

                <button
                    type="button"
                    onClick={openRegister}
                    className="text-boba-primary font-semibold hover:underline cursor-pointer"
                >
                    Register now
                </button>
            </p>
        </Modal >
    );
}

export default LoginModal;