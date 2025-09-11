import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Headphones,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/sections/ui/Navbar";
import Footer from "../components/sections/ui/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({
      name: "",
      email: "",
      userType: "",
      subject: "",
      message: "",
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed help via email",
      contact: "support@eventsphere.edu",
      subtext: "Response within 24 hours",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "+234 (0) 901 234 5678",
      subtext: "Mon-Fri, 9AM-6PM WAT",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant help when you need it",
      contact: "Available in-app",
      subtext: "Average response: 2 minutes",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      title: "Campus Representatives",
      description: "Connect with your local team",
      contact: "Find your rep",
      subtext: "On-campus support available",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const supportCategories = [
    {
      icon: Headphones,
      title: "Technical Support",
      description: "App issues, login problems, bugs",
      responseTime: "2-4 hours",
    },
    {
      icon: Users,
      title: "Account Help",
      description: "Registration, profile, permissions",
      responseTime: "4-8 hours",
    },
    {
      icon: MessageCircle,
      title: "Event Inquiries",
      description: "Event details, registration, certificates",
      responseTime: "1-2 hours",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-8 relative overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]">
      <Navbar />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}

        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl mt-10 font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-8">
            Get in Touch
          </h1>

          <p className="text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Have questions? Need help? Our dedicated support team is here to
            ensure your EventSphere experience is seamless and amazing.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <div
                className={`bg-gradient-to-r ${method.gradient} rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <method.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {method.title}
              </h3>

              <p className="text-gray-400 mb-4">{method.description}</p>

              <div className="text-purple-300 font-semibold mb-2">
                {method.contact}
              </div>

              <div className="text-sm text-gray-500">{method.subtext}</div>

              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Content - Form and Info */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-12">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">
                Send Us a Message
              </h2>
              <p className="text-gray-300">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>

            {isSubmitted && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">
                  Message sent successfully! We'll be in touch soon.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all"
                    placeholder="your.email@university.edu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  I am a *
                </label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all"
                >
                  <option value="" className="bg-gray-800">
                    Select your role
                  </option>
                  <option value="student" className="bg-gray-800">
                    Student
                  </option>
                  <option value="organizer" className="bg-gray-800">
                    Event Organizer
                  </option>
                  <option value="admin" className="bg-gray-800">
                    Administrator
                  </option>
                  <option value="other" className="bg-gray-800">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="group w-full bg-white text-slate-900 font-bold py-4 px-8 rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Send Message
              </button>
            </form>
          </div>

          {/* Support Categories & Info */}
          <div className="space-y-8">
            {/* Support Categories */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-white mb-6">
                Support Categories
              </h3>
              <div className="space-y-6">
                {supportCategories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-3 flex-shrink-0">
                      <category.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-1">
                        {category.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-2">
                        {category.description}
                      </p>
                      <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">
                        Response: {category.responseTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8 text-blue-400" />
                <h3 className="text-3xl font-bold text-white">Support Hours</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-300">Monday - Friday</span>
                  <span className="text-white font-medium">
                    9:00 AM - 6:00 PM WAT
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-300">Saturday</span>
                  <span className="text-white font-medium">
                    10:00 AM - 4:00 PM WAT
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-300">Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-xl">
                <p className="text-yellow-300 text-sm">
                  <strong>Note:</strong> During exam periods and major events,
                  support hours may be extended. Check our status page for
                  updates.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-white mb-6">Quick Help</h3>
              <div className="space-y-3">
                {[
                  "Getting Started Guide",
                  "How to Register for Events",
                  "Troubleshooting Login Issues",
                  "Certificate Download Help",
                  "Event Creation Tutorial",
                ].map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center gap-3 text-purple-300 hover:text-white transition-colors group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
