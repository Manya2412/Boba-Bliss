import { FaHome, FaMugHot, FaInfoCircle, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import stampImage from "../../assets/icons/stamp.png";

function Footer() {
    return (
        <footer className="bg-[#1F1F1F] text-white pt-8 pb-4">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="flex justify-center items-center">
                        <img
                            src={stampImage}
                            alt="Stamp Image"
                            className="w-45 h-45 rounded-full"
                        />
                    </div>

                    <div className="ml-14">
                        <h3 className="font-semibold text-xl mb-4">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-center gap-3">
                                <FaHome className="text-boba-primary text-2xl shrink-0" />
                                <span>Home</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaMugHot className="text-boba-primary text-xl shrink-0" />
                                <span>Menu</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaInfoCircle className="text-boba-primary text-xl shrink-0" />
                                <span>About</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-boba-primary text-xl shrink-0" />
                                <span>Contact</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-xl mb-4">
                            Contact
                        </h3>

                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-boba-primary text-2xl shrink-0" />
                                <span>Bangalore, India</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-boba-primary text-xl shrink-0" />
                                <span>helo@bobabliss.com</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-boba-primary text-xl shrink-0" />
                                <span>+91 9999999999</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-3 text-center text-gray-500">
                    © 2026 Boba Bliss | All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;