import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import { FaArrowRight } from "react-icons/fa";

import ProductCard from "../common/ProductCard";
import drinks from "../../data/drinks";

import "swiper/css";
import "swiper/css/pagination";

function PopularDrinks() {
    const navigate = useNavigate();

    return (
        <section className="bg-boba-cream py-15">
            <div className="max-w-7xl mx-auto px-6">

                <div className="relative text-center mb-12">
                    <p className="text-boba-primary font-semibold uppercase tracking-[4px]">
                        Popular Drinks
                    </p>

                    <h2 className="font-heading text-4xl md:text-5xl mt-4">
                        Customer Favorites
                    </h2>

                    <button
                        type="button"
                        onClick={() => navigate("/menu")}
                        className="mt-10 mr-5 inline-flex items-center gap-2 text-boba-primary font-semibold hover:text-boba-dark transition cursor-pointer md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:mt-0"
                    >
                        Show More
                        <FaArrowRight />
                    </button>
                </div>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={1}
                    centeredSlides
                    loop
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    className="popular-drinks-swiper !px-2 !pt-5 !pb-14"
                >
                    {drinks.slice(0, 5).map((drink) => (
                        <SwiperSlide key={drink.id}>
                            <ProductCard product={drink} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
}

export default PopularDrinks;
