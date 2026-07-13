"use client";

import { SignIn } from "@clerk/nextjs";
import { Church } from "lucide-react";

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen bg-[#0a0f05] flex items-center justify-center p-4">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,115,0,0.15)_0%,_transparent_60%)]" />

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#257300] mb-4 shadow-[0_0_40px_rgba(37,115,0,0.4)]">
                        <Church className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">GPT Hebron City</h1>
                    <p className="text-white/40 text-sm mt-1">Admin Portal — Authorized Access Only</p>
                </div>

                {/* Clerk Sign-In: login only, no social, no sign-up */}
                <div className="flex justify-center">
                    <SignIn
                        path="/admin/login"
                        routing="path"
                        // Invitation links land here with a sign-up ticket
                        // (__clerk_status=sign_up) — this lets invited users
                        // complete account creation on this same page.
                        withSignUp
                        fallbackRedirectUrl="/admin"
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                cardBox: "w-full shadow-none",
                                card: "bg-[#111a0b] border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
                                headerTitle: "text-white font-bold",
                                headerSubtitle: "text-white/50",
                                // Hide ALL social login buttons
                                socialButtonsRoot: "hidden",
                                dividerRow: "hidden",
                                formFieldLabel: "text-white/60",
                                formFieldInput: "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#257300] focus:ring-[#257300]/20",
                                formButtonPrimary: "bg-[#257300] hover:bg-[#1e5c00] text-white shadow-[0_0_20px_rgba(37,115,0,0.3)]",
                                // Hide the "Don't have an account? Sign up" footer
                                footerAction: "hidden",
                                identityPreview: "bg-white/5 border-white/10",
                                identityPreviewText: "text-white",
                                identityPreviewEditButton: "text-[#257300]",
                                formFieldAction: "text-[#257300]",
                                alertText: "text-red-400",
                                otpCodeFieldInput: "bg-white/5 border-white/10 text-white",
                            },
                            layout: {
                                socialButtonsPlacement: "bottom",
                                // Disable the sign-up link entirely
                                unsafe_disableDevelopmentModeWarnings: true,
                            },
                        }}
                        forceRedirectUrl="/admin"
                    />
                </div>
            </div>
        </div>
    );
}
