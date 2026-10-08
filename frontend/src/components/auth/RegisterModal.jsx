import { useState } from "react";
import {
    FaEnvelope,
    FaHome,
    FaLock,
    FaPhone,
    FaUser,
} from "react-icons/fa";

import Modal from "../common/Modal";
import { useAuth } from "../../context/AuthContext";
import { getApiError } from "../../utils/getApiError";

function RegisterModal({
    isOpen,
    onClose,
    onOpenLogin,
    onRegisterSuccess,
}) {
    const { register, isLoading } = useAuth();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        address: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({ ...currentData, [name]: value, }));

        setErrorMessage("");
    };

    const validateForm = () => {
        if (!formData.fullName.trim()) {
            return "Full name is required";
        }

        if (!formData.email.trim()) {
            return "Email is required";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            return "Enter a valid email address";
        }

        if (!/^\d{10}$/.test(formData.phone)) {
            return "Enter a valid 10-digit phone number";
        }

        if (formData.password.length < 6) {
            return "Password must contain at least 6 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            return "Passwords do not match";
        }

        if (!formData.address.trim()) {
            return "Delivery address is required";
        }

        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        const validationError = validateForm();

        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        const registrationData = {
            fullName: formData.fullName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            password: formData.password,
            address: formData.address.trim(),
        };

        try {
            await register(registrationData);

            setFormData({
                fullName: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
                address: "",
            });

            onClose();

            if (onRegisterSuccess) {
                onRegisterSuccess();
            }
        } catch (error) {
            setErrorMessage(
                getApiError(
                    error,
                    "Registration failed"
                )
            );

        }

    };

    const openLogin = () => {
        setErrorMessage("");
        onClose();
        onOpenLogin();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create an Account"
            maxwidth="max-w-x1"
        >

            <p className="text-gray-600 mb-6">
                Register once and order your favorite boba drinks anytime.
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

                {/* Full name */}
                <FormField
                    id="register-name"
                    label="Full name"
                    icon={<FaUser />}
                >
                    <input
                        id="register-name"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        className="form-input"
                    />
                </FormField >

                {/* Email */}
                < FormField
                    id="register-email"
                    label="Email address"
                    icon={< FaEnvelope />}
                >
                    <input
                        id="register-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="form-input"
                    />
                </FormField >

                {/* Phone */}
                < FormField
                    id="register-phone"
                    label="Phone number"
                    icon={< FaPhone />}
                >
                    <input
                        id="register-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit phone number"
                        autoComplete="tel"
                        maxLength="10"
                        className="form-input"
                    />
                </FormField >

                {/* Password */}
                < div className="grid sm-grid-cols-2 gap-4">
                    <FormField
                        id="register-password"
                        label="Password"
                        icon={< FaLock />}
                    >
                        <input
                            id="register-password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Minimum 6 characters"
                            autoComplete="new-password"
                            className="form-input"
                        />
                    </FormField>

                    <FormField
                        id="register-confirm-password"
                        label="Confirm password"
                        icon={< FaLock />}
                    >
                        <input
                            id="register-confirm-password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter password" autoComplete="new-password"
                            className="form-input"
                        />
                    </FormField>
                </div>

                {/* Address */}
                <FormField
                    id="register-address"
                    label="Delivery address"
                    icon={<FaHome />}
                    alienTop
                >
                    <textarea
                        id="register-address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your complete delivery address"
                        rows="3"
                        autoComplete="street-address"
                        className="form-input resize-none"
                    />
                </FormField>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-boba-primary text-white rounded-xl font-semibold hover:bg-boba-dark transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {isLoading
                        ? "Creating account..."
                        : "Register"}
                </button >
            </form >

            <p className="mt-6 text-center text-gray-600">
                Already registered?{" "}
                <button
                    type="button"
                    onClick={openLogin}
                    className="text-boba-primary font-semibold hover:underline"
                >
                    Login
                </button>
            </p>
        </Modal>
    );
}

function FormField({
    id,
    label,
    icon,
    children,
    alignTop = false,
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-semibold text-gray-700 mb-2"
            >
                {label}
            </label>

            <div className="relative">
                <span
                    className={`absolute left-4 text-gray-400 ${alignTop ? "top-4" : "top-1/2 -translate-y-1/2"
                        }`}
                >
                    {icon}
                </span>

                {children}
            </div>
        </div>
    );
}

export default RegisterModal;