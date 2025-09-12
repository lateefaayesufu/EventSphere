import React, { useState } from "react";

const AdminAuth = ({ onAuthSuccess }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    twoFactorCode: "",
  });
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(""); // Clear error when user starts typing
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call for login
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock validation - in a real app, this would be an API call to a backend
      if (
        credentials.username === "admin" &&
        credentials.password === "admin123"
      ) {
        if (!showTwoFactor) {
          setShowTwoFactor(true);
          setIsLoading(false);
          return;
        }

        if (credentials.twoFactorCode === "123456") {
          // Success - trigger auth success callback
          onAuthSuccess && onAuthSuccess();
        } else {
          setError("Invalid two-factor authentication code.");
        }
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      // The fix: we now use the 'error' variable.
      if (error.name === "AbortError") {
        // Handle a possible network cancellation
        setError("Request was cancelled.");
      } else {
        setError("Login failed. Please try again.");
      }
    }

    setIsLoading(false);
  };

  const handleBackToLogin = () => {
    setShowTwoFactor(false);
    setCredentials((prev) => ({ ...prev, twoFactorCode: "" }));
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Particles */}
        {[...Array(40)].map((_, i) => (
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

        {/* Large Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md mx-auto p-6 relative z-10">
        {/* Logo/Header Section */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
              <svg
                className="w-8 h-8 text-purple-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 8a6 6 0 01-7.743 5.743L10 14l-2 2-2-2v-4l2-2 2 2a6 6 0 017.743-2.257A6 6 0 0118 8z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M5 11a1 1 0 011-1h.01a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-2">
              EventSphere
            </h1>
            <p className="text-gray-300 text-lg font-semibold">Admin Portal</p>
          </div>
        </div>

        {/* Auth Form */}
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {!showTwoFactor ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Administrator Login
                </h2>
                <p className="text-gray-400">
                  Secure access to system administration
                </p>
              </div>

              <div className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 backdrop-blur-sm border border-red-400/50 rounded-2xl p-4">
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-red-400 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-red-300 font-semibold">{error}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300"
                        placeholder="Enter your username"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl px-12 py-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        <svg
                          className="w-5 h-5 text-gray-400 hover:text-white transition-colors"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          {showPassword ? (
                            <path
                              fillRule="evenodd"
                              d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                              clipRule="evenodd"
                            />
                          ) : (
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/50 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-500/30 hover:to-blue-500/30 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <svg
                    className="w-8 h-8 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Two-Factor Authentication
                </h2>
                <p className="text-gray-400">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>

              <div className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 backdrop-blur-sm border border-red-400/50 rounded-2xl p-4">
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-red-400 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-red-300 font-semibold">{error}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Authentication Code
                  </label>
                  <input
                    type="text"
                    name="twoFactorCode"
                    value={credentials.twoFactorCode}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-4 text-center text-white text-2xl font-mono tracking-widest placeholder-gray-400 focus:outline-none focus:border-green-400/50 focus:bg-white/10 transition-all duration-300"
                    placeholder="000000"
                    maxLength="6"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 text-white py-4 rounded-xl font-bold text-lg hover:from-green-500/30 hover:to-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>Verify & Login</span>
                    )}
                  </button>

                  <button
                    onClick={handleBackToLogin}
                    className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">
                Need help accessing your account?
              </p>
              <button className="text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors">
                Contact System Administrator
              </button>
            </div>
          </div>
        </div>

        {/* Test Credentials Info */}
        <div className="mt-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-4">
          <div className="text-center">
            <p className="text-blue-300 font-semibold text-sm mb-2">
              Demo Credentials
            </p>
            <p className="text-gray-400 text-xs">
              Username: admin | Password: admin123
            </p>
            <p className="text-gray-400 text-xs">2FA Code: 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
