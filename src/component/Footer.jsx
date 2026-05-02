import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Shield,
  Award
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-400 pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">

        {/* Branding & Description */}
        <div className="md:col-span-1">
          <div className="flex items-center ">

            <div className="flex items-center">
              <img
                src="/Images/logo1.png"
                alt="SecureTrade Logo"
                className="h-32 w-32  object-contain "
              />
            </div>
          </div>
          <p className="text-sm mb-4 leading-relaxed">
            Revolutionizing decentralized finance with blockchain technology and sustainable earning opportunities.
          </p>
          <div className="flex items-center text-sm mb-2">
            <Shield className="h-4 w-4 text-green-400 mr-2" />
            <span>Secure • Transparent • Trusted</span>
          </div>
          <p className="text-xs mt-4">
            © 2025 Jupiter. All Rights Reserved. <br />
            Powered by Jupiter (JUP) on the Solana Blockchain.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg flex items-center">
            <span>Quick Links</span>
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </h3>
          <ul className="space-y-3">
            {[
              { name: "HOME", path: "/" },
              { name: "Income Plans", path: "/incomePlans" },
              { name: "Stats", path: "/stats" },
              { name: "Terms & Conditions", path: "/termsConditions" },
              { name: "About", path: "/About" },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  className="text-sm hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Resources</h3>
          <ul className="space-y-3">
            {[
              "Whitepaper",
              "FAQ",
              "Tutorials",
              "Documentation",
              "Community Forum",
              "Support Center"
            ].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm hover:text-white transition-colors duration-300">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Connect With Us</h3>

          {/* Contact Info */}
          <div className="mb-6 space-y-3">
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mt-1 mr-3 text-blue-400" />
              <span className="text-sm">United States</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-3 text-blue-400" />
              <a href="mailto:support@jupiter.com" className="text-sm hover:text-white">contact@jupitertoken.us</a>
            </div>
            {/* <div className="flex items-center">
              <Phone className="h-4 w-4 mr-3 text-blue-400" />
              <a href="tel:+11234567890" className="text-sm hover:text-white">+1 (123) 456-7890</a>
            </div> */}
          </div>

          {/* Social Media */}
          <div>
            <p className="text-sm mb-3">Follow us on social media</p>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, color: "hover:text-blue-400", label: "Facebook" },
                { icon: Twitter, color: "hover:text-blue-300", label: "Twitter" },
                { icon: Instagram, color: "hover:text-pink-400", label: "Instagram" },
                { icon: Youtube, color: "hover:text-red-400", label: "YouTube" },
                { icon: MessageCircle, color: "hover:text-blue-300", label: "Telegram" }
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className={`p-2 bg-gray-800 rounded-lg transition-all duration-300 ${social.color} hover:bg-gray-700`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
        <div className="text-xs text-gray-500 mb-4 md:mb-0">
          {/* <span>JUP Token Contract: 0x1234...5678</span> */}
        </div>
        <div className="flex space-x-6 text-xs">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
        </div>
        <button
          onClick={scrollToTop}
          className="mt-4 md:mt-0 px-4 py-2 text-xs bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center"
        >
          Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;