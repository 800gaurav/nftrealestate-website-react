import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { User, Phone, Mail, MapPin, Share2, Send, CheckCircle2, MessageSquare, ChevronDown } from 'lucide-react';

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India (+91)" },
  { code: "+1", flag: "🇺🇸", name: "USA/Canada (+1)" },
  { code: "+971", flag: "🇦🇪", name: "UAE (+971)" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia (+966)" },
  { code: "+44", flag: "🇬🇧", name: "UK (+44)" },
  { code: "+974", flag: "🇶🇦", name: "Qatar (+974)" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait (+965)" },
  { code: "+968", flag: "🇴🇲", name: "Oman (+968)" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain (+973)" },
  { code: "+65", flag: "🇸🇬", name: "Singapore (+65)" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia (+60)" },
  { code: "+61", flag: "🇦🇺", name: "Australia (+61)" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand (+64)" },
  { code: "+977", flag: "🇳🇵", name: "Nepal (+977)" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh (+880)" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan (+92)" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka (+94)" },
  { code: "+49", flag: "🇩🇪", name: "Germany (+49)" },
  { code: "+33", flag: "🇫🇷", name: "France (+33)" },
  { code: "+39", flag: "🇮🇹", name: "Italy (+39)" },
  { code: "+34", flag: "🇪🇸", name: "Spain (+34)" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands (+31)" },
  { code: "+41", flag: "🇨🇭", name: "Switzerland (+41)" },
  { code: "+46", flag: "🇸🇪", name: "Sweden (+46)" },
  { code: "+47", flag: "🇳🇴", name: "Norway (+47)" },
  { code: "+353", flag: "🇮🇪", name: "Ireland (+353)" },
  { code: "+351", flag: "🇵🇹", name: "Portugal (+351)" },
  { code: "+32", flag: "🇧🇪", name: "Belgium (+32)" },
  { code: "+43", flag: "🇦🇹", name: "Austria (+43)" },
  { code: "+81", flag: "🇯🇵", name: "Japan (+81)" },
  { code: "+82", flag: "🇰🇷", name: "South Korea (+82)" },
  { code: "+86", flag: "🇨🇳", name: "China (+86)" },
  { code: "+852", flag: "🇭🇰", name: "Hong Kong (+852)" },
  { code: "+886", flag: "🇹🇼", name: "Taiwan (+886)" },
  { code: "+66", flag: "🇹🇭", name: "Thailand (+66)" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia (+62)" },
  { code: "+63", flag: "🇵🇭", name: "Philippines (+63)" },
  { code: "+84", flag: "🇻🇳", name: "Vietnam (+84)" },
  { code: "+90", flag: "🇹🇷", name: "Turkey (+90)" },
  { code: "+20", flag: "🇪🇬", name: "Egypt (+20)" },
  { code: "+27", flag: "🇿🇦", name: "South Africa (+27)" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria (+234)" },
  { code: "+254", flag: "🇰🇪", name: "Kenya (+254)" },
  { code: "+55", flag: "🇧🇷", name: "Brazil (+55)" },
  { code: "+52", flag: "🇲🇽", name: "Mexico (+52)" },
  { code: "+54", flag: "🇦🇷", name: "Argentina (+54)" }
];

const SOURCE_OPTIONS = [
  "Instagram",
  "Facebook",
  "Website",
  "YouTube",
  "Google Search",
  "Referral / Friend",
  "Other"
];

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+91',
    mobile: '',
    email: '',
    address: '',
    source: 'Instagram'
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!formData.mobile.trim()) {
      setErrorMsg('Please enter your mobile number');
      return;
    }

    // Format WhatsApp message
    const formattedMessage =
      `*New Inquiry / Lead Form*%0A` +
      `----------------------------------%0A` +
      `👤 *Name:* ${formData.name.trim()}%0A` +
      `📞 *Mobile:* ${formData.countryCode} ${formData.mobile.trim()}%0A` +
      `✉️ *Email:* ${formData.email.trim() || 'N/A'}%0A` +
      `🏠 *Address:* ${formData.address.trim() || 'N/A'}%0A` +
      `📍 *Source:* ${formData.source}%0A` +
      `----------------------------------`;

    const WHATSAPP_NUMBER = "919617766804";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${formattedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact-form" className="py-20 bg-slate-950/60 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 flex items-center gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" /> Instant WhatsApp Connect
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
            Get In Touch <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">With Us</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
            Fill out your details below to instantly connect with our investment specialists directly on WhatsApp.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mt-4"></div>
        </div>

        {/* Main Card Container */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-yellow-500/20 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl relative">
          
          {/* Subtle Glow Accents */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {openDropdown && (
              <div className="fixed inset-0 z-[90]" onClick={() => setOpenDropdown(null)} />
            )}
            
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm p-3.5 rounded-xl text-center font-medium">
                {errorMsg}
              </div>
            )}

            {submitted && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm p-3.5 rounded-xl text-center font-medium flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Redirecting to WhatsApp with your details...
              </div>
            )}

            {/* Row 1: Name & Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-yellow-400" /> Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-slate-900/90 border border-gray-800 focus:border-yellow-500/60 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none transition-colors shadow-inner"
                  required
                />
              </div>

              {/* Mobile Number with Country Code Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-yellow-400" /> Mobile Number <span className="text-red-400">*</span>
                </label>
                
                {/* Mobile Responsive Input Group */}
                <div className="flex gap-2 w-full items-center relative z-[95]">
                  <div className="relative shrink-0 w-[82px] sm:w-[96px]">
                    <div
                      onClick={() => setOpenDropdown(openDropdown === 'country' ? null : 'country')}
                      className="w-full bg-slate-900/90 border border-gray-800 focus:border-yellow-500/60 text-white rounded-xl pl-2.5 pr-6 py-3 text-xs sm:text-sm cursor-pointer truncate select-none relative"
                    >
                      {COUNTRY_CODES.find(c => c.code === formData.countryCode)?.flag} {formData.countryCode}
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                    </div>
                    
                    {openDropdown === 'country' && (
                      <ul className="absolute z-[100] mt-2 max-h-56 w-[240px] overflow-y-auto bg-slate-900 border border-gray-800 rounded-xl shadow-2xl py-2 scrollbar-thin scrollbar-thumb-gray-700">
                        {COUNTRY_CODES.map((item) => (
                          <li
                            key={item.code}
                            onClick={() => {
                              setFormData(p => ({ ...p, countryCode: item.code }));
                              setOpenDropdown(null);
                            }}
                            className="px-4 py-2.5 text-xs sm:text-sm text-white hover:bg-slate-800 cursor-pointer flex items-center gap-2 transition-colors"
                          >
                            <span>{item.flag}</span> <span>{item.name}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="w-full bg-slate-900/90 border border-gray-800 focus:border-yellow-500/60 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none transition-colors shadow-inner min-w-0 flex-1"
                    required
                  />
                </div>
              </div>

            </div>

            {/* Row 2: Email & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-yellow-400" /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-slate-900/90 border border-gray-800 focus:border-yellow-500/60 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none transition-colors shadow-inner"
                />
              </div>

              {/* Address / City */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-yellow-400" /> Address / City
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. New York, USA or London, UK"
                  className="w-full bg-slate-900/90 border border-gray-800 focus:border-yellow-500/60 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none transition-colors shadow-inner"
                />
              </div>

            </div>

            {/* Row 3: Where did you hear about us? (Source) */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Share2 className="h-3.5 w-3.5 text-yellow-400" /> Where did you hear about us?
              </label>
              <div className="relative w-full min-w-0 z-[90]">
                <div
                  onClick={() => setOpenDropdown(openDropdown === 'source' ? null : 'source')}
                  className="w-full max-w-full block box-border bg-slate-900/90 border border-gray-800 focus:border-yellow-500/60 text-white rounded-xl pl-4 pr-10 py-3 text-xs sm:text-sm cursor-pointer truncate select-none relative transition-colors"
                >
                  {formData.source}
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                
                {openDropdown === 'source' && (
                  <ul className="absolute z-[100] left-0 right-0 bottom-full mb-2 max-h-56 overflow-y-auto bg-slate-900 border border-gray-800 rounded-xl shadow-2xl py-2 scrollbar-thin scrollbar-thumb-gray-700">
                    {SOURCE_OPTIONS.map((opt) => (
                      <li
                        key={opt}
                        onClick={() => {
                          setFormData(p => ({ ...p, source: opt }));
                          setOpenDropdown(null);
                        }}
                        className="px-4 py-2.5 text-xs sm:text-sm text-white hover:bg-slate-800 cursor-pointer transition-colors"
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-emerald-950/40 hover:shadow-emerald-900/60 transition-all duration-300 flex items-center justify-center gap-3 text-sm sm:text-base group cursor-pointer"
              >
                <FaWhatsapp className="h-5 w-5 text-white transform group-hover:scale-110 transition-transform" />
                <span>Enquire Now</span>
                <Send className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="text-[11px] text-gray-500 text-center pt-2">
              🔒 Your details are completely secure and will be sent directly to our support WhatsApp.
            </p>

          </form>

        </div>

      </div>
    </section>
  );
};

export default ContactFormSection;
