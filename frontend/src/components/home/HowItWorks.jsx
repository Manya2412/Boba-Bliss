import { FaSearch, FaShoppingCart, FaTruck } from "react-icons/fa";

function HowItWorks() {
    const steps = [
        {
            icon: <FaSearch />,
            title: "Choose Your Drink",
            description: "Browse our menu and pick your favorite flavor.",
        }, {
            icon: <FaShoppingCart />,
            title: "Customize & Order",
            description: "Select toppings, sweetness and place your order.",
        }, {
            icon: <FaTruck />,
            title: "Enjoy Fresh Boba",
            description: "Get fresh boba tea delivered to your doorstep,",
        }
    ];

    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-boba-primary uppercase tracking-[4px] font-semibold">
                        Simple  Process
                    </p>

                    <h2 className="font-heading text-5xl mt-4">
                        How It Works
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-boba-cream rounded-3xl p-8 text-center"
                        >
                            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-white text-boba-primary text-3xl shadow-sm">
                                {step.icon}
                            </div>

                            <h3 className="mt-6 text-2xl font-semibold">
                                {step.title}
                            </h3>

                            <p className="mt-4 text-gray-600 leading-7">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;