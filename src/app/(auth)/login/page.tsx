"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import { Loader2 } from "lucide-react";
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'signup',
          message: `New sign-up request:
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}`,
        }),
      });

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: "Request received! We'll review your application and contact you shortly with your login credentials."
        });
        setFormData({ name: '', email: '', company: '' });
      } else {
        throw new Error('Failed to send registration request');
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send registration request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {isSignUp ? 'Request Access' : 'Welcome back'}
          </CardTitle>
          <CardDescription className="text-center">
            {isSignUp 
              ? "Fill out the form below and we'll get back to you shortly"
              : 'Sign in to your account'}
          </CardDescription>
        </CardHeader>
        {!isSignUp ? (
          // Login Form
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button className="w-full bg-gradient-to-r from-[#2E0854] to-[#9400D3] hover:from-[#3A0A6B] hover:to-[#A020F0]" type="submit">
              Sign in
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </Button>
            </div>
          </CardContent>
        ) : (
          // Sign Up Form
          <CardContent className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Name</Label>
                <Input
                  id="signup-name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-company">Company (Optional)</Label>
                <Input
                  id="signup-company"
                  placeholder="Your company"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>

              <div className="text-sm text-muted-foreground">
                After submitting, we will review your request and send your login credentials to your email address.
              </div>

              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-center ${
                    status.type === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {status.message}
                </motion.div>
              )}

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#2E0854] to-[#9400D3] hover:from-[#3A0A6B] hover:to-[#A020F0]"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Request Access'
                )}
              </Button>
            </form>
          </CardContent>
        )}
        <CardFooter className="flex flex-col space-y-2">
          <Button variant="link" className="text-sm text-muted-foreground">
            Forgot password?
          </Button>
          <div className="text-sm text-muted-foreground text-center">
            {isSignUp ? 'Already have an account?' : 'Need an account?'}{' '}
            <Button 
              variant="link" 
              className="p-0"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setStatus(null);
                setFormData({ name: '', email: '', company: '' });
              }}
            >
              {isSignUp ? 'Sign in' : 'Request access'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 
