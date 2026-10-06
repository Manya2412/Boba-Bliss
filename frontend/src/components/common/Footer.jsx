function Footer() {
    return (
        <footer className="bg-[#1F1F1F] text-white py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-10">
                    <div>
                        <h2 className="font-heading text-3xl text-boba-primary">
                            Boba Bliss
                        </h2>

                        <p className="mt-4 text-gray-400">
                            Freshly brewed happiness in every sip.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-xl mb-4">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-gray-400">
                            <li>Home</li>
                            <li>Menu</li>
                            <li>About</li>
                            <li>Contact</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-xl mb-4">
                            Contact
                        </h3>

                        <ul className="space-y-3 text-gray-400">
                            <li>Bangalore, India</li>
                            <li>helo@bobabliss.com</li>
                            <li>+91 9999999999</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500">
                    © 2026 Boba Bliss | All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;