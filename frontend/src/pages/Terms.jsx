import React from 'react';
import Navbar from '../components/sections/ui/Navbar';
import Footer from '../components/sections/ui/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen pt-32 pb-8 relative overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426] text-gray-200">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 space-y-8 shadow-xl">
          <p className="text-lg text-gray-300 leading-relaxed">
            Welcome to EventSphere! These Terms of Service ("Terms") govern your access to and use of our website, mobile application, and all related services (the "Services"). By accessing or using the Services, you agree to be bound by these Terms.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-300">
              By creating an account, registering for an event, or otherwise using the Services, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use the Services.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
              2. User Accounts
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400 pl-4">
              <li>
                <strong className="text-white">Eligibility:</strong> You must be a registered student, staff, or faculty member of the university to use the Services.
              </li>
              <li>
                <strong className="text-white">Account Responsibility:</strong> You are responsible for all activities that occur under your account. You must keep your password secure and notify us immediately of any unauthorized use.
              </li>
              <li>
                <strong className="text-white">Accuracy of Information:</strong> You agree to provide accurate and complete information during registration and to keep this information updated.
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
              3. Rules of Conduct
            </h2>
            <p className="text-gray-300">
              You agree not to use the Services to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 pl-4">
              <li>Post, upload, or transmit any content that is unlawful, harmful, defamatory, or infringes on any intellectual property rights.</li>
              <li>Harass, threaten, or intimidate others.</li>
              <li>Interfere with the operation of the Services or disrupt the experience of other users.</li>
              <li>Attempt to gain unauthorized access to any part of the Services or to other user accounts.</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
              4. Intellectual Property
            </h2>
            <p className="text-gray-300">
              All content and materials available on the Services, including text, graphics, logos, and software, are the property of EventSphere or its licensors and are protected by copyright and other intellectual property laws.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
              5. Termination
            </h2>
            <p className="text-gray-300">
              We may suspend or terminate your access to the Services at our sole discretion, without notice, for any violation of these Terms.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-2">
              6. Disclaimer of Warranties
            </h2>
            <p className="text-gray-300">
              The Services are provided "as is" and "as available," without any warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </div>

          <div className="text-sm text-gray-500 pt-4 border-t border-white/10">
            <p>
              These Terms of Service were last updated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;