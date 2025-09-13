import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginWithEmail, signup } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/sections/ui/Navbar";
import Footer from "../components/sections/ui/Footer";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import ButtonLoadingSpinner from "../components/sections/ui/ButtonLoadingSpinner";
import {
	Mail,
	Lock,
	User,
	GraduationCap,
	Building2,
	Phone,
	Eye,
	EyeOff,
	ArrowRight,
	Sparkles,
	UserPlus,
	Import,
} from "lucide-react";

// Login Component
const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		fullName: "",
		username: "",
		contactNumber: "",
		department: "",
		enrollmentNumber: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [view, setView] = useState("login"); // 'login' | 'signup'

	const { dispatch } = useAuth();

	const {
		mutate: loginMutate,
		isPending: isLoginLoading,
		isSuccess,
		isError,
		data,
		error,
	} = useMutation({
		mutationFn: loginWithEmail,
	});

	const {
		mutate: signupMutate,
		isPending: isSignupLoading,
		isSuccess: isSignupSuccess,
		isError: isSignupError,
		data: signupData,
		error: signupError,
	} = useMutation({
		mutationFn: signup,
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (isSuccess && data) {
			toast.success("Login successful!");
			dispatch({
				type: "LOGIN",
				payload: {
					fullName: data.user.fullName,
					role: data.user.role,
					id: data.user.id,
				},
			});
			if (data.user.role === "ADMIN") {
				navigate("/admin/dashboard");
			}
		}

		if (isError && error) {
			toast.error(error.response?.data?.error || "Login failed.");
		}
	}, [isSuccess, isError, data, error, dispatch, navigate]);

	useEffect(() => {
		if (isSignupSuccess && signupData) {
			toast.success("Signup successful!");
			setView("login");
			setFormData({
				email: "",
				password: "",
				fullName: "",
				username: "",
				contactNumber: "",
				department: "",
				enrollmentNumber: "",
			});
		}

		if (isSignupError && signupError) {
			toast.error(signupError.response?.data?.error || "Signup failed.");
		}
	}, [isSignupSuccess, isSignupError, signupData, signupError]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		if (!formData.email || !formData.password) {
			toast.error("Please fill in all fields.");
			return;
		}

		if (formData.password.length < 8) {
			toast.error("Invalid Credentials");
			return;
		}
		loginMutate(formData);
	};

	const handleSignupSubmit = (e) => {
		e.preventDefault();
		if (
			!formData.email ||
			!formData.password ||
			!formData.fullName ||
			!formData.contactNumber ||
			!formData.department ||
			!formData.enrollmentNumber
		) {
			toast.error("Please fill in all fields.");
			return;
		}

		if (formData.password.length < 8) {
			toast.error("Password must be at least 8 characters long.");
			return;
		}
		signupMutate(formData);
	};

	const renderContent = () => {
		if (view === "login") {
			return (
				<>
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-4">
							<User className="w-8 h-8 text-white" />
						</div>
						<h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
						<p className="text-gray-400">Sign in to your EventSphere account</p>
					</div>

					<form onSubmit={handleLoginSubmit} className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Email Address
							</label>
							<div className="relative">
								<Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
								<input
									type="email"
									name="email"
									value={formData.email}
									disabled={isLoginLoading}
									onChange={handleInputChange}
									className="w-full disabled:opacity-50 disabled:cursor-not-allowed  bg-white/10 border border-white/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 backdrop-blur-lg transition-all"
									placeholder="Enter your email"
									required
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Password
							</label>
							<div className="relative">
								<Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									className="w-full bg-white/10 border border-white/30 rounded-xl pl-12 pr-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 backdrop-blur-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
									placeholder="Enter your password"
									required
									disabled={isLoginLoading}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
								>
									{showPassword ? (
										<EyeOff className="w-5 h-5" />
									) : (
										<Eye className="w-5 h-5" />
									)}
								</button>
							</div>
						</div>

						<button
							type="submit"
							disabled={isLoginLoading}
							className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
						>
							{isLoginLoading ? (
								<ButtonLoadingSpinner />
							) : (
								<>
									<span>Sign In</span>
									<ArrowRight className="w-5 h-5" />
								</>
							)}
						</button>
					</form>

					<div className="mt-8 text-center text-gray-400">
						Don't have an account?{" "}
						<button
							onClick={() => setView("signup")}
							className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
						>
							Sign up
						</button>
					</div>
				</>
			);
		} else {
			return (
				<>
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-4">
							<UserPlus className="w-8 h-8 text-white" />
						</div>
						<h1 className="text-3xl font-bold text-white mb-2">
							Join EventSphere
						</h1>
						<p className="text-gray-400">
							Create your new account to get started
						</p>
					</div>

					<form onSubmit={handleSignupSubmit} className="space-y-6">
						<div className="flex flex-col sm:flex-row sm:space-x-4">
							<div className="flex-1 mb-4 sm:mb-0">
								<label className="block text-sm font-medium text-gray-300 mb-2">
									Full Name
								</label>
								<div className="relative">
									<User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
									<input
										type="text"
										name="fullName"
										value={formData.fullName}
										onChange={handleInputChange}
										className="w-full bg-white/10 border border-white/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 backdrop-blur-lg transition-all"
										placeholder="Enter your full name"
										required
										disabled={isSignupLoading}
									/>
								</div>
							</div>

							<div className="flex-1">
								<label className="block text-sm font-medium text-gray-300 mb-2">
									Email Address
								</label>
								<div className="relative">
									<Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										className="w-full bg-white/10 border border-white/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 backdrop-blur-lg transition-all"
										placeholder="Enter your email"
										required
										disabled={isSignupLoading}
									/>
								</div>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Password
							</label>
							<div className="relative">
								<Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									className="w-full bg-white/10 border border-white/30 rounded-xl pl-12 pr-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 backdrop-blur-lg transition-all"
									placeholder="Create a password"
									required
									disabled={isSignupLoading}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
								>
									{showPassword ? (
										<EyeOff className="w-5 h-5" />
									) : (
										<Eye className="w-5 h-5" />
									)}
								</button>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row sm:space-x-4">
							<div className="flex-1 mb-4 sm:mb-0">
								<label className="block text-sm font-medium text-gray-300 mb-2">
									Contact Number
								</label>
								<div className="relative">
									<Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
									<input
										type="tel"
										name="contactNumber"
										value={formData.contactNumber}
										onChange={handleInputChange}
										className="w-full bg-white/10 border border-white/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 backdrop-blur-lg transition-all"
										placeholder="Enter your contact number"
										required
										disabled={isSignupLoading}
									/>
								</div>
							</div>

							<div className="flex-1">
								<label className="block text-sm font-medium text-gray-300 mb-2">
									Department
								</label>
								<div className="relative">
									<Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
									<input
										type="text"
										name="department"
										value={formData.department}
										onChange={handleInputChange}
										className="w-full bg-white/10 border border-white/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 backdrop-blur-lg transition-all"
										placeholder="e.g., Computer Science"
										required
										disabled={isSignupLoading}
									/>
								</div>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Enrollment Number
							</label>
							<div className="relative">
								<GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
								<input
									type="text"
									name="enrollmentNumber"
									value={formData.enrollmentNumber}
									onChange={handleInputChange}
									className="w-full bg-white/10 border border-white/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 backdrop-blur-lg transition-all"
									placeholder="Enter your enrollment number"
									required
									disabled={isSignupLoading}
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={isSignupLoading}
							className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
						>
							{isSignupLoading ? (
								<ButtonLoadingSpinner />
							) : (
								<>
									<span>Create Account</span>
									<Sparkles className="w-5 h-5" />
								</>
							)}
						</button>
					</form>

					<div className="mt-8 text-center text-gray-400">
						Already have an account?{" "}
						<button
							onClick={() => setView("login")}
							className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
						>
							Log in
						</button>
					</div>
				</>
			);
		}
	};

	return (
		<div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]">
			<Navbar />
			<div className="flex-grow flex items-center justify-center pt-40 pb-8 relative z-10">
				<div className="max-w-md mx-auto px-6">
					<div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
						{renderContent()}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Login;
