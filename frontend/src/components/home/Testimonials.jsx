import MenImage from "../../assets/images/men.png";
import WomenImage from "../../assets/images/women.png";

function Testimonials() {
    const reviews = [
        {
            icon: MenImage,
            name: "Ayush Gahalaut",
            review: "Loved that I could customize the sweetness and toppings. The packaging was neat, and my drink arrived in great condition. Really nice experience!",
        },
        {
            icon: WomenImage,
            name: "Priya Sharma",
            review: "Tried the strawberry milk tea for the first time and really enjoyed it. It was creamy without being too heavy. I’m excited to try more flavors from the menu!",
        },
        {
            icon: MenImage,
            name: "Rahul Kumar",
            review: "The brown sugar boba was so good! The sweetness was just right, and the pearls were soft and chewy. Definitely ordering again.",
        },
    ];

    return (
        <section className="bg-boba-cream py-15">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-boba-primary uppercase tracking-[4px] font-semibold">
                        Testimonials
                    </p>

                    <h2 className="font-heading text-5xl mt-4">
                        What our Customers Say?
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-8 shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={review.icon}
                                    alt={review.name}
                                    className="w-20 h-20 rounded-full object-cover"
                                />

                                <div>
                                    <h4 className="font-semibold text-lg">
                                        {review.name}
                                    </h4>

                                    <div className="text-yellow-500 text-xl">
                                        ⭐⭐⭐⭐⭐
                                    </div>
                                </div>

                            </div>

                            <p className="mt-6 text-gray-600 leading-7">
                                {review.review}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;