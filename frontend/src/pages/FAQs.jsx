import React, { useState } from "react";
import Navbar from "../components/sections/ui/Navbar";
import Footer from "../components/sections/ui/Footer";
import {
  Users,
  Calendar,
  Headphones,
  Briefcase,
  ChevronDown,
} from "lucide-react";

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      category: "General & Technical",
      icon: Headphones,
      questions: [
        {
          q: "What is EventSphere?",
          a: "EventSphere is your campus hub for discovering, attending, and creating events. We connect students and faculty with the most exciting happenings on and around campus, from hackathons to cultural nights.",
        },
        {
          q: "How do I sign up for an account?",
          a: "To create an account, click the 'Sign Up' button on the top right corner. You'll need to provide your university email address to get started. It’s quick, easy, and free!",
        },
        {
          q: "I'm having trouble logging in. What should I do?",
          a: "If you're experiencing login issues, first try resetting your password. If the problem persists, please check your internet connection or use our Live Chat for instant technical support.",
        },
        {
          q: "Is there an EventSphere mobile app?",
          a: "Yes! The EventSphere app is available for both iOS and Android. You can download it from the App Store or Google Play to manage your events on the go.",
        },
      ],
    },
    {
      category: "For Students & Attendees",
      icon: Users,
      questions: [
        {
          q: "How do I register for an event?",
          a: "To register, navigate to the event page and click the 'Register' or 'Get Ticket' button. You'll receive a confirmation email with all the details you need to attend.",
        },
        {
          q: "Can I cancel my registration?",
          a: "You can cancel your registration directly from your profile dashboard. For events with paid tickets, please check the organizer’s specific refund policy, which is listed on the event page.",
        },
        {
          q: "I lost my event certificate. How can I get a new one?",
          a: "Certificates are available for download in your 'My Events' dashboard after the event concludes. If you're still unable to find it, please contact our support team with the event details.",
        },
        {
          q: "What happens if an event is canceled?",
          a: "In the rare case of a cancellation, you will receive an immediate email notification. Any fees paid will be refunded according to the organizer's policy. We will also update the event page accordingly.",
        },
      ],
    },
    {
      category: "For Event Organizers",
      icon: Calendar,
      questions: [
        {
          q: "How do I create an event?",
          a: "After logging in, go to your dashboard and select 'Create Event'. Our user-friendly event builder will guide you through adding details, managing tickets, and publishing your event to the campus.",
        },
        {
          q: "Is it free to host an event on EventSphere?",
          a: "Hosting a free event is completely free! If you plan to sell tickets, a small service fee is applied per ticket sold to cover payment processing and platform maintenance.",
        },
        {
          q: "How do I manage my event's attendees?",
          a: "Your organizer dashboard provides a complete list of all registered attendees. You can view their details, send them messages, and even manage on-site check-ins using our in-app features.",
        },
        {
          q: "Can I promote my event through EventSphere?",
          a: "Yes! EventSphere offers various promotional tools. Once your event is live, you can find options in your dashboard to feature your event and reach a wider audience on campus.",
        },
      ],
    },
    {
      category: "For Campus Administrators & Partners",
      icon: Briefcase,
      questions: [
        {
          q: "How can my department or organization partner with EventSphere?",
          a: "We welcome partnerships with campus departments and student organizations! Please reach out to our dedicated Campus Representatives via the Contact page to discuss collaboration opportunities and get a demo of our admin tools.",
        },
        {
          q: "Can we use EventSphere for official campus events?",
          a: "Absolutely. EventSphere is designed to be the official platform for university-wide events, from departmental seminars to commencement ceremonies. Our platform provides robust tools for large-scale event management.",
        },
        {
          q: "How can I access event analytics and attendee data?",
          a: "Once you create a partner account, your dashboard will provide comprehensive analytics on event attendance, registration trends, and user engagement, helping you measure your events' impact.",
        },
        {
          q: "Is there an easy way to manage multiple events at once?",
          a: "Our dedicated admin dashboard allows you to oversee all events linked to your department, manage multiple organizers, and get a bird's-eye view of your entire event portfolio.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-8 relative overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]">
      <Navbar />
      {/* Background elements, same as Contact page */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 mt-10 bg-clip-text text-transparent mb-4 sm:mb-8">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed px-2">
            Find quick answers to the most common questions about using
            EventSphere.
          </p>
        </div>

        {/* FAQs Accordion Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {faqData.map((category, catIndex) => (
            <div
              key={catIndex}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-12 space-y-4 sm:space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 sm:gap-4 text-white mb-4 sm:mb-6">
                <div className="bg-white/10 p-2 sm:p-3 rounded-lg">
                  <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  {category.category}
                </h3>
              </div>

              {/* Questions List */}
              <div className="space-y-2 sm:space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <div
                    key={faqIndex}
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <button
                      className="flex justify-between items-center w-full py-3 sm:py-4 text-left transition-colors hover:text-purple-400"
                      onClick={() => toggleAccordion(`${catIndex}-${faqIndex}`)}
                    >
                      <span className="text-sm sm:text-base lg:text-lg text-white font-semibold">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300 ${
                          openIndex === `${catIndex}-${faqIndex}`
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        openIndex === `${catIndex}-${faqIndex}`
                          ? "max-h-96 py-3 sm:py-4"
                          : "max-h-0"
                      }`}
                    >
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Faqs;
