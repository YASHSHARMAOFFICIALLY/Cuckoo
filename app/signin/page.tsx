'use client'  
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Github, Chrome, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";

export default function SignInPage() {
    const router = useRouter();
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

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/dashboard"
            });

            if (error) {
                toast.error(error.message || "Failed to sign in");
            } else {
                toast.success("Signed in successfully!");
                router.push("/hospitals");
            }
        } catch (err) {
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
                callbackURL: "/hospitals"
            });
        } catch (err) {
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
        <div className="flex items-center justify-center min-h-screen bg-muted/40 px-4">
            <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Arogya Assam</CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access your patient dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleEmailSignIn} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="name@example.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link 
                                    href="/forgot-password" 
                                    className="text-xs text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input 
                                id="password" 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Sign In
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div> 

                    <div className="grid grid-cols-2 gap-4">
                        <Button 
                            variant="outline" 
                            onClick={() => handleSocialSignIn("google")}
                            disabled={loading}
                        >
                            <Chrome className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={() => handleSocialSignIn("github")}
                            disabled={loading}
                        >
                            <Github className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-wrap items-center justify-center gap-1 border-t bg-muted/50 py-4 text-sm">
                    <span className="text-muted-foreground">Don&apos;t have an account?</span>
                    <Link href="/signup" className="font-medium text-primary hover:underline">
                        Create an Account
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
