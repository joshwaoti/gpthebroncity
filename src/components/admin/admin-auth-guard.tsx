"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { useEffect } from "react";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname.startsWith("/admin/login");

    useEffect(() => {
        if (isLoaded && !isSignedIn && !isLoginPage) {
            router.push("/admin/login");
        }
    }, [isLoaded, isSignedIn, isLoginPage, router]);

    if (isLoginPage) return <>{children}</>;

    if (!isLoaded) {
        return (
            <div className="h-screen bg-[#0a0f05] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-[#257300] border-t-transparent rounded-full animate-spin" />
                    <p className="text-white/40 text-sm animate-pulse">Loading Admin Portal...</p>
                </div>
            </div>
        );
    }

    if (!isSignedIn) return null;

    const userName = user.fullName || user.username || "Admin";
    const userEmail = user.primaryEmailAddress?.emailAddress || "";
    const userRole = (user.publicMetadata?.role as string) || "super_admin";

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <AdminSidebar
                userRole={userRole}
                userName={userName}
                userEmail={userEmail}
            />
            <main className="flex-1 w-full min-w-0 pb-10">
                {children}
            </main>
        </div>
    );
}
