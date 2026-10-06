function Testimonials() {
    const reviews = [
        {
            name: "Ayush Gahalaut",
            review: "The best boba tea I've ever hhad. Highly recommended!",
        },
        {
            name: "Rahul Kumar",
            review: "The best boba tea I've ever hhad. Highly recommended!",
        },
        {
            name: "Priya Sharma",
            review: "The best boba tea I've ever hhad. Highly recommended!",
        },
    ];

    return (
        <section className="bg-boba-cream py-20">
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
                            <div className="text-yellow-500 text-xl">
                                ⭐⭐⭐⭐⭐
                            </div>

                            <p className="mt-4 text-gray-600 leading-7">
                                "{review.review}"
                            </p>

                            <h4 className="mt-6 font-semibold text-lg">
                                {review.name}
                            </h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;