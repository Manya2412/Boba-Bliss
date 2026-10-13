import ContactImage from "../../assets/images/contact.png";

function ContactSection() {
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

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-4 rounded-xl border border-boba-gray mb-4 outline-none"
                        />

                        <button className="w-full bg-boba-primary text-white py-4 rounded-xl font-semibold hover:bg-boba-dark transition cursor-pointer">
                            Subscribe
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default ContactSection;