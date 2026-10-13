import { useState } from "react";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ProductCard from "../components/common/ProductCard";
import drinks from "../data/drinks";
import menuBobaImage from "../assets/images/menuBoba.png"

function Menu() {
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        "Milk Tea",
        "Fruit Tea",
        "Matcha",
        "Smoothies",
    ];

    const filteredDrinks = drinks.filter((drink) => {
        const matchesSearch = drink.name
            .toLowerCase()
            .includes(searchText.toLowerCase().trim());

        const matchesCategory =
            selectedCategory === "All" ||
            drink.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Navbar />

            <section
                className="w-full bg-cover bg-center bg-no-repeat flex items-center"
                style={{
                    backgroundImage: `url(${menuBobaImage})`,
                }}
            >

                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="max-w-2xl py-8">
                        <p className="text-boba-primary uppercase tracking-[4px] font-semibold">
                            Our Menu
                        </p>

                        <h1 className="font-heading text-5xl lg:text-6xl leading-tight mt-4">
                            Discover Your
                            <span className="block text-boba-primary">
                                Favorite Boba Drinks
                            </span>
                        </h1>

                        <p className="mt-5 max-w-xl text-gray-700 text-lg">
                            Handcrafted with premium ingredients, unique flavors and
                            a whole lot of happiness.
                        </p>
                    </div>
                </div>
            </section>


            <section className="bg-white py-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

                        {/* Category filters */}
                        <div className="flex flex-wrap gap-4">
                            {categories.map((category) => (
                                <button
                                    type="button"
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-3 rounded-full border transition ${selectedCategory === category
                                        ? "bg-boba-primary border-boba-primary text-white cursor-pointer"
                                        : "bg-white border-boba-primary text-boba-primary hover:bg-pink-50 cursor-pointer"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="w-full lg:w-80">
                            <input
                                type="search"
                                value={searchText}
                                onChange={(event) => setSearchText(event.target.value)}
                                placeholder="Search drinks..."
                                className="w-full border border-gray-300 px-5 py-3 rounded-xl outline-none focus:border-boba-primary focus:ring-2 focus:ring-pink-100"
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="bg-white pb-20">
                <div className="max-w-7xl mx-auto px-6">

                    {filteredDrinks.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredDrinks.map((drink) => (
                                <ProductCard
                                    key={drink.id}
                                    product={drink}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="text-6xl mb-5">🧋</div>

                            <h2 className="font-heading text-3xl text-boba-text">
                                No drinks found
                            </h2>

                            <p className="mt-3 text-gray-500">
                                Try another search term or select a different category.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearchText("");
                                    setSelectedCategory("All");
                                }}
                                className="mt-6 bg-boba-primary text-white px-7 py-3 rounded-xl hover:bg-boba-dark transition cursor-pointer"
                            >
                                Show All Drinks
                            </button>
                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </>
    );
}

export default Menu;
