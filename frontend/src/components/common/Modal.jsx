import { FaTimes } from "react-icons/fa";

function Modal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = "max-w-lg",
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">

            {/* Background Overlay */}
            <button
                type="button"
                aria-label="Close modal"
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            ></button>

            {/* Modal */}
            <div className={`relative w-full ${maxWidth} max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8`}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading text-3xl text-boba-text">
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-boba-primary transition"
                    >
                        <FaTimes />
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}

export default Modal;