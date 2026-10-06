function OfferBanner() {
    return (
        <section className="py-20 bg-boba-primary">
            <div className="max-w-6xl mx-auto px-6">
                <div className="bg-gradient-to-r from-boba-primary to-boba-dark rounded-3xl p-12 text-white text-center">
                    <p className="uppercase tracking-[4px] text-sm font-semibold">
                        Special Order
                    </p>

                    <h2 className="font-heading text-5xl mt-4">
                        Get 20% Off
                    </h2>

                    <p className="mt-4 text-lg">
                        Use coupon code
                    </p>

                    <div className="mt-6 inline-block bg-white text-boba-primary px-8 py-4 roundeed-xl text-3xl font-bold">
                        BOBA20
                    </div>

                    <div className="mt-8">
                        <button className="bg-white text-boba-primary px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
                            Order Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OfferBanner;