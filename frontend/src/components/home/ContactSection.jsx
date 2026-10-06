import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa"

function ContactSection() {
    return (
        <section id="contact" className="bg-white py-20">
            <div className="max-w-7x1 mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-boba-primary uppercase tracking-[4px] font-semibold">
                        Contact Us
                    </p>

                    <h2 className="font-heading text-5x1 mt-4">
                        Let's Connect
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <FaMapMarkerAlt className="text-boba-primary text-2xl" />
                            <div>
                                <h3 className="font-semibold">Address</h3>
                                <p className="text-gray-600">Bangalore, India</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <FaPhoneAlt className="text-boba-primary text-2x1" />
                            <div>
                                <h3 className="font-semibold">Phone</h3>
                                <p className="text-gray-600">+91 99999 99999</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <FaEnvelope className="text-boba-primary text-2x1" />
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="text-gray-600">hello@bobabliss.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="bg-boba-cream rounded-3x1 p-8">
                        <h3 className="font-heading text-3x1 mb-4">
                            Subscribe to Updates
                        </h3>

                        <p className="text-gray-600 mb-6">
                            Be the first to know about new drinks and special offers.
                        </p>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-4 rounded-x1 border border-boba-border mb-4 outline-none"
                        />

                        <button className="w-full bg-boba-primary text-white py-4 rounded-xl font-semibold hover:bg-boba-dark transition">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;