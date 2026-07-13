"use client";

import { SignIn } from "@clerk/nextjs";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const clerkAppearance = {
    variables: {
        colorPrimary: "#257300",
        colorText: "#1a1a1a",
        colorTextSecondary: "#6B6B6B",
        colorBackground: "#ffffff",
        colorInputBackground: "#ffffff",
        colorInputText: "#1a1a1a",
        borderRadius: "10px",
        fontFamily: "var(--font-montserrat), ui-sans-serif, system-ui",
    },
    elements: {
        rootBox: "w-full",
        cardBox: "w-full shadow-none",
        card: "w-full bg-transparent p-0 shadow-none",
        header: "hidden",
        socialButtonsRoot: "hidden",
        dividerRow: "hidden",
        form: "gap-5",
        formFieldRow: "gap-2",
        formFieldLabel: "text-sm font-semibold text-[#293322]",
        formFieldInput:
            "min-h-11 rounded-lg border-[#d9ddcf] bg-white px-3 text-[#1a1a1a] shadow-sm placeholder:text-[#8a9183] focus:border-[#257300] focus:ring-2 focus:ring-[#257300]/15",
        formButtonPrimary:
            "min-h-11 rounded-lg bg-[#257300] text-sm font-semibold text-white shadow-sm hover:bg-[#1e5c00] focus-visible:ring-2 focus-visible:ring-[#257300] focus-visible:ring-offset-2",
        footerAction: "hidden",
        footer: "pt-4",
        footerPages: "text-[#6B6B6B]",
        identityPreview: "rounded-lg border border-[#d9ddcf] bg-[#f7f7f3]",
        identityPreviewText: "text-[#1a1a1a]",
        identityPreviewEditButton: "text-[#257300]",
        formFieldAction: "font-semibold text-[#257300] hover:text-[#1e5c00]",
        alert: "rounded-lg border border-red-200 bg-red-50",
        alertText: "text-red-700",
        otpCodeFieldInput: "border-[#d9ddcf] bg-white text-[#1a1a1a]",
        backLink: "font-semibold text-[#257300] hover:text-[#1e5c00]",
    },
    layout: {
        socialButtonsPlacement: "bottom" as const,
        unsafe_disableDevelopmentModeWarnings: true,
    },
};

export default function AdminLoginPage() {
    return (
        <main className="min-h-dvh bg-[#f5f3ee] text-[#1a1a1a] lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(28rem,0.92fr)]">
            <section className="relative min-h-56 overflow-hidden sm:min-h-72 lg:min-h-dvh" aria-label="GPT Hebron City NextGen church project">
                <Image
                    src="/assets/img/projects_hero.jpg"
                    alt="Architectural rendering of the GPT Hebron City NextGen church facility"
                    fill
                    priority
                    sizes="(min-width: 1024px) 54vw, 100vw"
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[#071006]/55" />

                <div className="relative z-10 flex h-full min-h-56 flex-col justify-between p-6 sm:min-h-72 sm:p-8 lg:min-h-dvh lg:p-12 xl:p-16">
                    <div className="w-fit rounded-lg bg-white px-4 py-3 shadow-sm">
                        <Image
                            src="/assets/img/logo/church-logo-white.png"
                            alt="GPT Hebron City"
                            width={280}
                            height={68}
                            className="h-auto w-56 sm:w-64"
                        />
                    </div>

                    <div className="hidden max-w-xl text-white lg:block">
                        <div className="mb-5 flex size-11 items-center justify-center rounded-lg border border-white/30 bg-black/20">
                            <ShieldCheck className="size-5" aria-hidden="true" />
                        </div>
                        <p className="mb-3 text-sm font-semibold text-[#e6c95d]">Church administration</p>
                        <h1 className="text-balance font-display text-4xl font-semibold leading-tight text-white xl:text-5xl">
                            Stewarding the work. Serving the city.
                        </h1>
                        <p className="mt-5 max-w-lg text-pretty text-base leading-7 text-white/80">
                            A secure workspace for the team entrusted with GPT Hebron City&apos;s ministries, people, and mission.
                        </p>
                    </div>

                    <p className="hidden text-sm text-white/65 lg:block">Authorized staff access only</p>
                </div>
            </section>

            <section className="flex min-h-[calc(100dvh-14rem)] min-w-0 items-center px-5 py-10 sm:min-h-[calc(100dvh-18rem)] sm:px-10 lg:min-h-dvh lg:px-14 xl:px-20">
                <div className="mx-auto min-w-0 w-full max-w-[calc(100vw-2.5rem)] sm:max-w-md">
                    <Link
                        href="/"
                        className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#586052] hover:text-[#257300] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#257300] focus-visible:ring-offset-4"
                    >
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        Back to church website
                    </Link>

                    <div className="mb-8">
                        <div className="mb-5 flex size-11 items-center justify-center rounded-lg bg-[#e5eedf] text-[#257300]">
                            <LockKeyhole className="size-5" aria-hidden="true" />
                        </div>
                        <p className="mb-2 text-sm font-semibold text-[#257300]">Admin portal</p>
                        <h2 className="text-balance font-display text-3xl font-semibold text-[#1a1a1a] sm:text-4xl">
                            Welcome back
                        </h2>
                        <p className="mt-3 text-pretty text-sm leading-6 text-[#6B6B6B] sm:text-base">
                            Sign in with your authorized staff account to continue to the dashboard.
                        </p>
                    </div>

                    <div className="admin-login-clerk min-w-0 w-full">
                        <SignIn
                            path="/admin/login"
                            routing="path"
                            withSignUp
                            fallbackRedirectUrl="/admin"
                            forceRedirectUrl="/admin"
                            appearance={clerkAppearance}
                        />
                    </div>

                    <div className="mt-8 flex items-start gap-3 border-t border-[#d9ddcf] pt-6 text-sm text-[#6B6B6B]">
                        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#257300]" aria-hidden="true" />
                        <p className="text-pretty leading-6 text-inherit">
                            Access is monitored and limited to approved GPT Hebron City administrators.
                        </p>
                    </div>
                </div>
            </section>

            <style jsx global>{`
                .admin-login-clerk .cl-socialButtonsRoot,
                .admin-login-clerk .cl-socialButtonsBlockButton,
                .admin-login-clerk .cl-dividerRow {
                    display: none !important;
                }

                .admin-login-clerk .cl-rootBox,
                .admin-login-clerk .cl-cardBox,
                .admin-login-clerk .cl-card {
                    box-sizing: border-box;
                    min-width: 0 !important;
                    width: 100% !important;
                    max-width: 100% !important;
                }
            `}</style>
        </main>
    );
}
