import heroImage from "../../assets/images/hero-boba.png";
import heroImageBanner from "../../assets/images/hero-banner.png";

function HeroSection() {
    return (
        <section
            className="min-h-[750px] bg-cover bg-center bg-no-repeat flex items-center"
            style={{
                backgroundImage: `url(${heroImageBanner})`,
            }}
        >
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-2xl">
                    <p className="text-boba-primary uppercase tracking-[5px] font-semibold mb-4">
                        Sip Happiness
                    </p >

                    <h1 className="font-heading text-6xl 1g:text-8xl font-bold leading-tight text-boba-text">
                        Delicious Boba.
                    </h1 >

                    <h1 className="font-heading text-6xl lg:text-8xl font-bold leading-tight text-boba-text">
                        Made for You.
                    </h1>

                    <p className="mt-6 max-w-xl text-lg text-gray-600 leading-8">
                        Fresh ingredients, unique flavors and the perfect blend
                        of tea, milk and happiness in every cup.
                    </ p>

                    <div className="flex flex-wrap gap-4 mt-8">
                        <button className="px-8 py-4 rounded-xl bg-boba-primary text-white font-semibold shadow-lg hover:bg-boba-dark transition duration-300">
                            Explore Menu
                        </button>

                        <button className="px-8 py-4 rounded-xl bg-white border border-gray-300 font-semibold hover:shadow-md transition duration-300">
                            Order Now
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-10 mt-14">
                        <div>
                            <h3 className="text-3xl font-bold text-boba-text">
                                4.9
                            </h3>

                            <p className="text-gray-500">
                                Rating
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-boba-text">
                                50+
                            </h3>

                            <p className="text-gray-500">
                                Flavors
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-boba-text">
                                10K+
                            </h3>

                            <p className="text-gray-500">
                                Happy Customers
                            </p>
                        </div>
                    </div>
                </div >
            </div >
        </section >
    );
}

export default HeroSection;