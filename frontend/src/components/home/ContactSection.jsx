
import { useState } from "react";
import ContactImage from "../../assets/images/contact.png";

function ContactSection() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();

        if (!email.trim()) return;

        setIsSubscribed(true);
    };

    return (
        <section id="contact" className="bg-white py-15">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-boba-primary uppercase tracking-[4px] font-semibold">
                        Contact Us
                    </p>

                    <h2 className="font-heading text-5xl mt-4">
                        Let's Connect
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-14 max-w-5xl mx-auto">

                    <div className="flex-1 flex justify-center">
                        <img
                            src={ContactImage}
                            alt="Contact Us"
                            className="w-full max-w-[400px] h-auto object-contain"
                        />
                    </div>

                    <div className="flex-1 w-full max-w-[600px] bg-boba-cream rounded-3xl p-10">
                        <h3 className="font-heading text-3xl mb-4">
                            Subscribe for Updates
                        </h3>

                        <p className="text-gray-600 mb-6">
                            Be the first to know about new drinks and special offers.
                        </p>

                        {isSubscribed ? (
                            <div className="text-center py-6">
                                <div className="text-4xl mb-4">🎉</div>

                                <h4 className="text-2xl font-heading text-boba-primary mb-3">
                                    Thank you for subscribing! 
                                </h4>

                                <p className="text-gray-600">
                                    Stay tuned for
                                    delicious updates, new drinks, and exclusive
                                    offers from Boba Bliss.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full p-4 rounded-xl border border-boba-gray mb-4 outline-none"
                                />

                                <button
                                    type="submit"
                                    className="w-full bg-boba-primary text-white py-4 rounded-xl font-semibold hover:bg-boba-dark transition cursor-pointer"
                                >
                                    Subscribe
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default ContactSection;
