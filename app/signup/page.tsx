'use client'
import { signupSchema } from "@/lib/validators";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/password";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/email";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Github, Chrome, Loader2, User, Mail, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";
import z from "zod";

export default function SignUpPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    
    // Check if user is already logged in
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (session) {
            router.push("/hospitals");
        }
    }, [session, router]);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = signupSchema.safeParse({name,email,password})
        if(!result.success){
            return toast.error(result.error.issues[0].message)
        }
        setLoading(true);
        console.log("Attempting signup for:", email);

        try {
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: "/hospitals"
            });

            if (error) {
                console.error("Signup error details:", error);
                toast.error(error.message || "Failed to create account");
            } else {
                console.log("Signup successful:", data);
                toast.success("Account created successfully!");
                router.push("/hospitals");
            }
        } catch (err) {
            console.error("Unexpected signup error:", err);
            toast.error("An unexpected error occurred during signup");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialSignUp = async (provider: "google" | "github") => {
        setLoading(true);
        try {
            await authClient.signIn.social({
                provider,
                callbackURL: "/hospitals"
            });
        } catch (err) {
            toast.error(`Failed to sign up with ${provider}`);
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/40 px-4">
            <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
                    <CardDescription className="text-center">
                        Join Arogya Assam to manage your medical records and find healthcare
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    id="name" 
                                    type="text" 
                                    placeholder="John Doe" 
                                    className="pl-10"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    className="pl-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    id="password" 
                                    type="password" 
                                    placeholder="••••••••"
                                    className="pl-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                    minLength={8}
                                />
                            </div>
                            <p className="text-[10px] text-muted-foreground">
                                Must be at least 8 characters long
                            </p>
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Create Account
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or sign up with
                            </span>
                        </div>
                    </div> 

                    <div className="grid grid-cols-2 gap-4">
                        <Button 
                            variant="outline" 
                            onClick={() => handleSocialSignUp("google")}
                            disabled={loading}
                        >
                            <Chrome className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={() => handleSocialSignUp("github")}
                            disabled={loading}
                        >
                            <Github className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-wrap items-center justify-center gap-1 border-t bg-muted/50 py-4 text-sm">
                    <span className="text-muted-foreground">Already have an account?</span>
                    <Link href="/signin" className="font-medium text-primary hover:underline">
                        Sign In
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
