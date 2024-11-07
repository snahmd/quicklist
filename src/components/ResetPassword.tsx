"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "../assets/quicklist-logo.png";
import bg1 from "../assets/login-bg-1.png";
import bg2 from "../assets/login-bg-2.png";
import Footer from "./Footer";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Handle password reset logic here
  };

  const footerLinks = {
    quicklist: {
      title: "Quicklist",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/careers", label: "Careers" },
        { href: "/press", label: "Press" },
        { href: "/magazine", label: "Magazine" },
        { href: "/sustainability", label: "Sustainability" },
        { href: "/mobile-apps", label: "Mobile Apps" },
      ],
    },
    information: {
      title: "Information",
      links: [
        { href: "/help", label: "Help" },
        { href: "/security", label: "Security Tips" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/privacy-settings", label: "Privacy Settings" },
        { href: "/terms", label: "Terms of Use" },
        { href: "/imprint", label: "Imprint" },
      ],
    },
    business: {
      title: "For Business",
      links: [
        { href: "/business/real-estate", label: "Real Estate" },
        { href: "/business/pro", label: "PRO for Business" },
        { href: "/business/advertise", label: "Advertise" },
      ],
    },
    social: {
      title: "Social Media",
      links: [
        { href: "/social/facebook", label: "Facebook" },
        { href: "/social/youtube", label: "YouTube" },
        { href: "/social/instagram", label: "Instagram" },
        { href: "/social/twitter", label: "Twitter" },
        { href: "/social/pinterest", label: "Pinterest" },
        { href: "/social/tiktok", label: "TikTok" },
      ],
    },
    general: {
      title: "General",
      links: [
        { href: "/popular", label: "Popular Searches" },
        { href: "/listings", label: "Listings Overview" },
        { href: "/business-pages", label: "Business Pages" },
        { href: "/reviews", label: "Reviews" },
      ],
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#9CCB3B]">
      {/* Header */}
      <header className="py-6 bg-white">
        <div className="container flex justify-center">
          <Link to="/" className="flex items-center justify-center gap-2">
            <img src={logo} alt="quicklist-logo" className="lg:ml-48" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-[1200px] mx-auto px-4 py-8 relative overflow-hidden">
        {/* Decorative Images */}
        <div className="absolute left-0 bottom-0 w-72 h-72 opacity-50 hidden lg:block">
          <img
            src={bg1}
            alt="Decorative"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
        <div className="absolute right-0 bottom-0 w-72 h-72 opacity-50 hidden lg:block">
          <img
            src={bg2}
            alt="Decorative"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* Reset Password Form */}
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
          <p className="text-muted-foreground mb-6">
            Please enter your email address. You will receive an email with a
            link to set up a new password.
          </p>

          {isSubmitted ? (
            <div className="text-center space-y-4">
              <p className="text-green-600">
                If an account exists for {email}, you will receive a password
                reset email shortly.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => (window.location.href = "/login")}
              >
                Return to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                  placeholder="Enter your email address"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#9CCB3B] hover:bg-[#8BB82D]"
              >
                Send
              </Button>
              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
