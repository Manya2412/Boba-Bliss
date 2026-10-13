import React, { useState } from "react";
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

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            return "Enter a valid email address.";
        }

        if (!/^\d{10}$/.test(formData.phone)) {
            return "Enter a valid 10-digit phone number.";
        }

        if (formData.password.length < 6) {
            return "Password must contain at least 6 characters.";
        }

        if (formData.password !== formData.confirmPassword) {
            return "Passwords do not match.";
        }

        if (!formData.address.trim()) {
            return "Delivery address is required.";
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
            maxwidth="max-w-xl"
        >

            {errorMessage && (
                <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                    {errorMessage}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                < div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                        id="register-name"
                        label="Full Name"
                        icon={<FaUser />}
                    >
                        <input
                            id="register-name"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            autoComplete="name"
                            className="form-input"
                        />
                    </FormField >

                    < FormField
                        id="register-phone"
                        label="Phone Number"
                        icon={< FaPhone />}
                    >
                        <input
                            id="register-phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit number"
                            autoComplete="tel"
                            maxLength="10"
                            className="form-input"
                        />
                    </FormField >
                </div>

                < FormField
                    id="register-email"
                    label="Email Address"
                    icon={< FaEnvelope />}
                >
                    <input
                        id="register-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="user@bobabliss.com"
                        autoComplete="email"
                        className="form-input"
                    />
                </FormField >

                < div className="grid sm:grid-cols-2 gap-4">
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
                            placeholder="Min 6 characters"
                            autoComplete="new-password"
                            className="form-input"
                        />
                    </FormField>

                    <FormField
                        id="register-confirm-password"
                        label="Confirm Password"
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

                <FormField
                    id="register-address"
                    label="Delivery Address"
                    icon={<FaHome />}
                    alignTop
                >
                    <textarea
                        id="register-address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your delivery address"
                        rows="2"
                        autoComplete="street-address"
                        className="form-input resize-none"
                    />
                </FormField>

                <button
                    type="submit"
                    disabled={
                        isLoading ||
                        !formData.fullName.trim() ||
                        !formData.email.trim() ||
                        !formData.phone ||
                        !formData.password ||
                        !formData.confirmPassword ||
                        !formData.address.trim()
                    }

                    className={`w-full py-3 text-white rounded-xl font-semibold transition ${isLoading ||
                        !formData.email.trim() ||
                        !formData.password
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-boba-primary hover:bg-boba-dark cursor-pointer"
                        }`}
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
                    className="text-boba-primary font-semibold hover:underline cursor-pointer"
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
                    className={`absolute left-4 text-gray-400 ${alignTop
                        ? "top-4"
                        : "top-1/2 -translate-y-1/2"
                        }`}
                >
                    {icon}
                </span>

                {React.cloneElement(children, {
                    className: `w-full pl-11 pr-4 py-2 border border-gray-300 rounded-xl outline-none focus:border-boba-primary focus:ring-2 focus:ring-pink-100 ${children.props.className || ""
                        }`,
                })}
            </div>
        </div>
    );
}



export default RegisterModal;