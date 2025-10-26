// src/components/ui/Footer.jsx
import Icon from "../../components/AppIcon";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-950 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">CampGear</h2>
          <p className=" text-sm">
            Making outdoor adventures accessible for everyone. Rent gear, save
            money, and explore nature sustainably.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 ">
            <li>
              <a href="/rentals" className="hover:text-green-500 transition">
                Rentals
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-green-500 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-green-500 transition">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-green-500 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 ">
            <li>
              <a href="/faq" className="hover:text-green-500 transition">
                FAQ
              </a>
            </li>
            <li>
              <a
                href="/help-center"
                className="hover:text-green-500 transition"
              >
                Help Center
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-green-500 transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-green-500 transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-white hover:text-green-500 transition">
              <Icon name="Facebook" size={32} />
            </a>
            <a href="#" className="text-white hover:text-green-500 transition">
              <Icon name="Twitter" size={32} />
            </a>
            <a href="#" className="text-white hover:text-green-500 transition">
              <Icon name="Instagram" size={32} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-green-800 mt-8 pt-4 text-center text-green-300 text-sm">
        &copy; {new Date().getFullYear()} CampGear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
