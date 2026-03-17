'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Github, Chrome, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";

export default function SignInClient() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const nextPath = searchParams.get("next");
    const redirectTarget = nextPath?.startsWith("/") ? nextPath : "/dashboard";

    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (session) {
            router.push(redirectTarget);
        }
    }, [session, router, redirectTarget]);

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: redirectTarget
            });

            if (error) {
                toast.error(error.message || "Failed to sign in");
            } else {
                toast.success("Signed in successfully!");
                router.push(redirectTarget);
            }
        } catch {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialSignIn = async (provider: "google" | "github") => {
        setLoading(true);
        try {
            await authClient.signIn.social({
                provider,
                callbackURL: redirectTarget
            });
        } catch {
            toast.error(`Failed to sign in with ${provider}`);
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
        <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-b from-sky-200 via-sky-100 to-white">
            <Card className="w-full max-w-sm p-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl border border-white/40">

                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-3xl font-semibold tracking-tight">FinVeda</CardTitle>
                    <CardDescription className="text-sm text-gray-500 max-w-xs mx-auto">
                        Enter your credentials to access your dashboard
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">

                    <form onSubmit={handleEmailSignIn} className="space-y-4">

                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                className="h-11 rounded-lg bg-gray-100 border-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">

                            <div className="flex items-center justify-between">
                                <Label>Password</Label>
                                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>

                            <Input
                                className="h-11 rounded-lg bg-gray-100 border-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                type="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                required
                            />

                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:opacity-90"
                            disabled={loading}
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            Sign In
                        </Button>

                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"/>
                        </div>

                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 text-gray-400">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <Button
                            className="h-10 rounded-lg bg-white border"
                            variant="outline"
                            onClick={()=>handleSocialSignIn("google")}
                        >
                            <Chrome className="mr-2 h-4 w-4"/>
                            Google
                        </Button>

                        <Button
                            className="h-10 rounded-lg bg-white border"
                            variant="outline"
                            onClick={()=>handleSocialSignIn("github")}
                        >
                            <Github className="mr-2 h-4 w-4"/>
                            Github
                        </Button>

                    </div>
#yash
                </CardContent>

                <CardFooter className="flex justify-center gap-1 border-t py-4 text-sm text-gray-500">
                    <span>Don't have an account?</span>
                    <Link href="/signup" className="font-medium text-primary hover:underline">
                        Create an Account
                    </Link>
                </CardFooter>

            </Card>
        </div>
    );
}