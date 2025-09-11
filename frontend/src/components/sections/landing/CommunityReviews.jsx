import React from "react";
import { Quote } from "lucide-react";

const reviewsData = [
  {
    id: 1,
    quote:
      "EventSphere completely transformed our club's outreach. We went from struggling to get 20 people to our workshops to having them sell out in days!",
    author: "Kelechi O.",
    role: "President, AI/ML Club",
    college: "Lagos University",
    date: "July 2025",
    type: "Organizer",
  },
  {
    id: 2,
    quote:
      "I used to find out about campus events on my way to class from a crumpled notice on a board. EventSphere puts everything in my pocket. I've joined two new clubs already!",
    author: "Fatima A.",
    role: "Engineering Student",
    college: "University of Abuja",
    date: "August 2025",
    type: "Student",
  },
  {
    id: 3,
    quote:
      "The certificate distribution feature is a lifesaver. No more manual tracking or printing. It's a professional and efficient way to validate our participants' efforts.",
    author: "Tunde I.",
    role: "Dean of Student Affairs",
    college: "Redeemer's College",
    date: "June 2025",
    type: "Administrator",
  },
  {
    id: 4,
    quote:
      "I can't believe how many students registered for our 'Code for a Cause' hackathon. The platform's promotion tools are top-notch and super easy to use.",
    author: "Chidinma E.",
    role: "Lead, Tech-for-Good",
    college: "Obafemi Awolowo University",
    date: "September 2025",
    type: "Organizer",
  },
  {
    id: 5,
    quote:
      "Finally, a single platform that connects all campus activities! I never have to worry about missing an important lecture or competition again.",
    author: "Aisha F.",
    role: "Medical Student",
    college: "University of Nigeria",
    date: "September 2025",
    type: "Student",
  },
  {
    id: 6,
    quote:
      "As a campus administrator, I appreciate the centralized dashboard. We now have a clear overview of all events and can track engagement across departments.",
    author: "David O.",
    role: "Director of Campus Life",
    college: "Rivers State University",
    date: "July 2025",
    type: "Administrator",
  },
];

const CommunityReviews = () => {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background gradient blobs for glassmorphism effect */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-600/25 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-300">
              50,000+ Active Students
            </span>
          </div>

          <h3 className="text-5xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
            Real Stories from
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {" "}
              Our Community
            </span>
          </h3>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            See how EventSphere is transforming campus life across universities
            in Nigeria and beyond.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {reviewsData.map((review, index) => (
            <div
              key={review.id}
              className="relative p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-0 backdrop-blur-lg bg-white/10 border border-white/20"
              style={{
                transform: `rotate(${index % 2 === 0 ? "2deg" : "-2deg"})`,
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Glassmorphism dog-ear fold */}
              <div
                className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] rounded-tr-2xl opacity-30"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                  borderTopColor: "rgba(255, 255, 255, 0.2)",
                  borderRightColor: "rgba(255, 255, 255, 0.2)",
                }}
              ></div>

              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-white/30">
                <Quote size={48} />
              </div>

              {/* Type Badge */}
              <div className="inline-block px-4 py-2 rounded-full text-xs font-semibold mb-4 bg-white/20 backdrop-blur-sm text-white border border-white/30">
                {review.type}
              </div>

              {/* Review Quote */}
              <p className="relative z-10 text-white text-lg md:text-xl leading-relaxed mb-6 font-medium">
                {review.quote}
              </p>

              {/* Author Details */}
              <div className="relative z-10 mt-auto">
                <div className="font-bold text-white text-xl">
                  {review.author}
                </div>
                <div className="text-white/80 text-sm">{review.role}</div>
                <div className="text-white/80 text-sm">{review.college}</div>
                <div className="text-white/60 text-xs mt-2">{review.date}</div>
              </div>

              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityReviews;
