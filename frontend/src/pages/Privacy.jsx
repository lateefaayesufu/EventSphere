import React from 'react';
import Navbar from '../components/sections/ui/Navbar';
import Footer from '../components/sections/ui/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen pt-32 pb-8 relative overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426] text-gray-200">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 space-y-8 shadow-xl">
          <p className="text-lg text-gray-300 leading-relaxed">
            Your privacy is important to us. This Privacy Policy explains how EventSphere ("we," "us," or "our") collects, uses, and shares your information when you use our website, mobile application, and related services (collectively, the "Services").
          </p>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
              1. Information We Collect
            </h2>
            <p className="text-gray-300">
              We collect information to provide and improve our Services. The types of information we collect include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 pl-4">
              <li>
                <strong className="text-white">Personal Information:</strong> Information you provide to us directly, such as your name, email address, phone number, and university ID when you register for an account, sign up for an event, or contact our support team.
              </li>
              <li>
                <strong className="text-white">Usage Data:</strong> We automatically collect information about how you interact with our Services. This includes IP addresses, browser type, pages viewed, time spent on pages, and referring URLs. We use this data to analyze trends and enhance user experience.
              </li>
              <li>
                <strong className="text-white">Event-Related Data:</strong> Information related to events you attend or organize, including registration details, feedback, and participation status.
              </li>
              <li>
                <strong className="text-white">Cookies and Tracking Technologies:</strong> We use cookies to remember your preferences, authenticate your session, and track usage patterns. You can manage your cookie settings through your browser.
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-300">
              Your information is used to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 pl-4">
              <li>Provide, operate, and maintain our Services.</li>
              <li>Process your event registrations and manage your account.</li>
              <li>Communicate with you about events, updates, and support inquiries.</li>
              <li>Personalize your experience and show you relevant content.</li>
              <li>Analyze usage and improve our Services, features, and functionality.</li>
              <li>Detect, prevent, and address technical issues and security threats.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
              3. Sharing Your Information
            </h2>
            <p className="text-gray-300">
              We do not sell your personal data. We may share your information with third parties only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 pl-4">
              <li>
                <strong className="text-white">Event Organizers:</strong> We may share your registration details (e.g., name and email) with the organizers of events you sign up for, as necessary to manage the event.
              </li>
              <li>
                <strong className="text-white">Service Providers:</strong> We use third-party companies to help us with our business, such as hosting, payment processing, and analytics. They have access to your information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </li>
              <li>
                <strong className="text-white">Legal Compliance:</strong> We may disclose your information if required by law, subpoena, or other legal process.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
              4. Data Security
            </h2>
            <p className="text-gray-300">
              We take reasonable measures to protect your information from unauthorized access, loss, or misuse. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
              5. Your Rights
            </h2>
            <p className="text-gray-300">
              Depending on your location, you may have the right to access, correct, update, or delete your personal information. To exercise these rights, please contact us at support@eventsphere.edu.
            </p>
          </div>

          <div className="text-sm text-gray-500 pt-4 border-t border-white/10">
            <p>
              This Privacy Policy was last updated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;