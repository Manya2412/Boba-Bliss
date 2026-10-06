import { FaLeaf, FaGlassWhiskey, FaMotorcycle, FaHeart, } from "react-icons/fa";

function FeaturesSection() {
    const features = [
        {
            icon: <FaLeaf />,
            title: "Fresh Ingredients",
            description: "Premium tea leaves and fresh ingredients sourced daily.",

        }, {
            icon: <FaGlassWhiskey />,
            title: "Customizable Drinks",
            description: "Choose your sweetness, toppings and ice level.",
        }, {
            icon: <FaMotorcycle />,
            title: "Fast Delivery",
            description: "Enjoy fresh boba delivered quickly to your doorstep.",
        }, {
            icon: <FaHeart />,
            title: "Made With Love",
            description: "Every cup is crafted carefully for the perfect taste.",
        },
    ];

    return (
        <section
            id="features"
            className="bg-white py-20"
        >
            <div className="max-w-7x1 mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-boba-primary font-semibold uppercase tracking-[4px]">
                        Why Choose Us ?
                    </p>

                    <h2 className="font-heading text-5x1 mt-4 text-boba-text">
                        The Boba Bliss Difference
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white border border-boba-border rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
                        >
                            <div className="w-16 h-16 rounded-2x1 bg-pink-100 flex items-center justify-center text-boba-primary text-2xl">
                                {feature.icon}
                            </div>

                            <h3 className="mt-6 text-xl font-semibold">
                                {feature.title}
                            </h3 >

                            <p className="mt-3 text-gray-600 leading-7">
                                {feature.description}
                            </p>
                        </div >
                    ))}
                </div >
            </div >
        </section >
    );
}

export default FeaturesSection;