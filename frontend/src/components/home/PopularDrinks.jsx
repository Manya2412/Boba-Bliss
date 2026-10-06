function PopularDrinks() {
    const drinks = [
        {
            emoji: "🧋",
            name: "Classic Milk Tea",
            price: "₹149",
            rating: "4.9",
        }, {
            emoji: "🧋",
            name: "Matcha Latte",
            price: "₹149",
            rating: "4.9",
        },
        {
            emoji: "🧋",
            name: "Mango Green Tea",
            price: "₹149",
            rating: "4.9",
        }, {
            emoji: "🧋",
            name: "Strawberry Boba",
            price: "₹149",
            rating: "4.9",
        },
    ];

    return (
        <section className="bg-boba-cream py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-boba-primary font-semibold uppercase tracking-[4px]">
                        Popular Drinks
                    </p>

                    <h2 className="font-heading text-5xl mt-4">
                        Customer Favorite
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {drinks.map((drink, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl shadow-sm hover:shadow-xl p-6 transition"
                        >
                            <div className="text-7xl text-center mb-5">
                                {drink.emoji}
                            </div>

                            <div className="text-xl font-semibold text-center">
                                {drink.name}
                            </div>

                            <p className="text-center text-gray-500 mt-2">
                                {drink.rating}
                            </p>

                            <p className="text-center text-2xl font-bold text-boba-primary mt-3">
                                {drink.price}
                            </p>

                            <button className="w-full mt-5 py-3 rounded-xl bg-boba-primary text-white font-semibold hover:bg-boba-dark transition">
                                Add To Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default PopularDrinks;