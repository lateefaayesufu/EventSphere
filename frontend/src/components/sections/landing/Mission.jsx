import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  Calendar,
  Trophy,
  Globe,
  Rocket,
  Heart,
  Zap,
} from "lucide-react";

const Mission = () => {
  const [stats, setStats] = useState({
    events: 0,
    students: 0,
    colleges: 0,
    certificates: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const sectionElRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleMouseMove = (e) => {
      const rect = sectionElRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        sectionElRef.current?.style.setProperty("--mouse-x", `${x}%`);
        sectionElRef.current?.style.setProperty("--mouse-y", `${y}%`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const targets = {
      events: 247,
      students: 3420,
      colleges: 23,
      certificates: 1580,
    };

    const duration = 3000;
    const steps = 120;
    const stepTime = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setStats({
        events: Math.floor(targets.events * easeOutQuart),
        students: Math.floor(targets.students * easeOutQuart),
        colleges: Math.floor(targets.colleges * easeOutQuart),
        certificates: Math.floor(targets.certificates * easeOutQuart),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setStats(targets);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [isVisible]);

  const statsData = [
    {
      icon: Calendar,
      number: stats.events,
      suffix: "+",
      label: "Events Hosted",
      description: "Memories made, connections forged",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      number: stats.students.toLocaleString(),
      suffix: "+",
      label: "Active Students",
      description: "Unlocking potential, one event at a time",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Trophy,
      number: stats.certificates.toLocaleString(),
      suffix: "+",
      label: "Certificates Issued",
      description: "Recognizing talent, rewarding participation",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Globe,
      number: stats.colleges,
      suffix: "",
      label: "Partner Colleges",
      description: "Connecting campuses nationwide",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section
      ref={sectionElRef}
      className="relative pt-0 pb-10 px-4 md:px-20 overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]"
    >
      {/* Background with Neural Network-style Connections */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
            </radialGradient>
          </defs>
          {Array.from({ length: 20 }).map((_, i) => (
            <circle
              key={`node-${i}`}
              cx={Math.random() * 1200}
              cy={Math.random() * 800}
              r={2 + Math.random() * 4}
              fill="#8b5cf6"
              className="animate-pulse"
              style={{ animationDelay: `${Math.random() * 3}s` }}
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <path
              key={`path-${i}`}
              d={`M${Math.random() * 1200},${Math.random() * 800} Q${
                Math.random() * 1200
              },${Math.random() * 800} ${Math.random() * 1200},${
                Math.random() * 800
              }`}
              stroke="#8b5cf6"
              strokeWidth="1"
              fill="none"
              className="animate-draw"
              style={{
                strokeDasharray: "1000",
                strokeDashoffset: "1000",
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={sectionRef}
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="relative inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 ">
            <Rocket className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-white/80 font-medium">Our Impact</span>
          </div>
          <h2 className="relative text-4xl md:text-4xl lg:text-6xl font-bold mb-6 mt-4">
            <div className="text-white">
              Pioneering the Future Of{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                {" "}
                Student Life{" "}
              </span>
            </div>
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
            We are revolutionizing how to discover, participate, and create
            unforgettable experiences on campus.
          </p>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
              >
                <div
                  className={`relative bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 overflow-hidden shadow-lg transition-all duration-500 group-hover:bg-white/20`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>

                  <div
                    className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${stat.gradient} transform transition-all duration-500 group-hover:scale-110`}
                  >
                    <IconComponent className="w-8 h-8 text-white animate-pulse-slow" />
                  </div>

                  <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tighter">
                    {typeof stat.number === "string"
                      ? stat.number
                      : stat.number.toLocaleString()}
                    <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 ml-1">
                      {stat.suffix}
                    </span>
                  </div>

                  <div className="text-lg md:text-xl font-semibold text-gray-200 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 relative z-10">
          <button className="relative group overflow-hidden px-10 py-5 rounded-2xl font-bold text-lg text-black ">
            <div
              className={`absolute inset-0 rounded-2xl bg-white opacity-80 `}
            ></div>
            <div
              className={`absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-100 `}
            ></div>
            <span className="relative z-10">
              Launch Your Event Now <span className="ml-2">→</span>
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }
        @keyframes draw {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-draw {
          animation: draw var(--animation-duration) linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Mission;
