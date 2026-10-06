import { useState } from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import ContactSection from "../components/home/ContactSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HeroSection from "../components/home/HeroSection";
import HowItWorks from "../components/home/HowItWorks";
import OfferBanner from "../components/home/OfferBanner";
import PopularDrinks from "../components/home/PopularDrinks";
import Testimonials from "../components/home/Testimonials";

function Home({
    openLogin,
    openRegister,
}) {

    return (
        <>
            <Navbar
                openLogin={openLogin}
                openRegister={openRegister}
            />
            <HeroSection />
            <FeaturesSection />
            <PopularDrinks />
            <HowItWorks />
            <OfferBanner />
            <Testimonials />
            <ContactSection />
            <Footer />
        </>
    );
}

export default Home;
