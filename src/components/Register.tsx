"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Apple, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import logo from "../assets/quicklist-logo.png";
import bg1 from "../assets/login-bg-1.png";
import bg2 from "../assets/login-bg-2.png";
import Footer from "./Footer";
import { supabase } from "@/utils/supabaseClient";
import { useUserContext } from "@/context/userContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here

    const result = await supabase.auth.signUp({ email, password });
    if (result.error) {
      alert(result.error.message);
    } else {
      setUser(result.data.user);
      console.log(result);
      alert("You have successfully registered to Quicklist");
      navigate("/login", {
        state: {
          message: "Kayıt başarılı! Lütfen e-posta adresinizi onaylayın.",
        },
      });
    }
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

        {/* Register Card */}
        <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Your Registration Data
            </CardTitle>
            <CardDescription className="text-center">
              Create an account to start buying and selling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* reCAPTCHA placeholder */}
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center gap-2">
                  <Checkbox id="captcha" />
                  <label htmlFor="captcha" className="text-sm">
                    I'm not a robot
                  </label>
                </div>
                <div className="mt-2 text-xs text-muted-foreground flex items-center justify-between">
                  <span>reCAPTCHA</span>
                  <div className="flex gap-2">
                    <Link to="/privacy" className="hover:underline">
                      Privacy
                    </Link>
                    -
                    <Link to="/terms" className="hover:underline">
                      Terms
                    </Link>
                  </div>
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="flex items-start gap-2">
                <Checkbox id="newsletter" />
                <label htmlFor="newsletter" className="text-sm leading-none">
                  Yes, I would like to receive regular news via email from the
                  company group - you can unsubscribe at any time.
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#9CCB3B] hover:bg-[#8BB82D]"
              >
                Register for free
              </Button>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      Or register with
                    </span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <Button variant="outline" type="button" className="w-full">
                    <Mail className="h-5 w-5 text-[#EA4335]" />
                    <span className="sr-only">Register with Gmail</span>
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <Apple className="h-5 w-5" />
                    <span className="sr-only">Register with Apple</span>
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">Register with GitHub</span>
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                By registering, you agree to our{" "}
                <Link to="/terms" className="text-[#9CCB3B] hover:underline">
                  Terms of Service
                </Link>
                . Learn about how we process your data in our{" "}
                <Link to="/privacy" className="text-[#9CCB3B] hover:underline">
                  Privacy Policy
                </Link>
                .
              </div>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-[#9CCB3B] hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
