"use client";

import { useUser, useSession } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { api } from "@/../convex/_generated/api";
import { AdminSidebar } from "@/components/admin/sidebar";
import { canAccessAdminPath, isAdminRole } from "@/lib/admin-permissions";

function LoadingScreen() {
    return (
        <div className="h-screen bg-[#0a0f05] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-[#257300] border-t-transparent rounded-full animate-spin" />
                <p className="text-white/40 text-sm animate-pulse">Checking admin access...</p>
            </div>
        </div>
    );
}

function AccessDenied({ message }: { message: string }) {
    return (
        <div className="h-screen bg-[#0a0f05] flex items-center justify-center px-6">
            <div className="text-center max-w-sm">
                <h2 className="text-white text-lg font-bold mb-2">Access Denied</h2>
                <p className="text-white/50 text-sm mb-6">{message}</p>
                <a href="/admin" className="text-[#6EA704] text-sm font-medium hover:underline">
                    Back to the admin dashboard
                </a>
            </div>
        </div>
    );
}

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const { session } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname.startsWith("/admin/login");
    const currentUser = useQuery(
        api.users.getCurrent,
        isLoginPage || !isLoaded || !isSignedIn ? "skip" : {},
    );
    const recordClientEvent = useMutation(api.auditLog.recordClientEvent);
    const bootstrapLegacyOwner = useMutation(api.users.bootstrapLegacyOwner);
    const recordedLoginSession = useRef<string | null>(null);
    const lastRecordedView = useRef<string | null>(null);
    const bootstrapStarted = useRef(false);
    const [bootstrapFailed, setBootstrapFailed] = useState(false);

    useEffect(() => {
        if (isLoaded && !isSignedIn && !isLoginPage) router.push("/admin/login");
    }, [isLoaded, isSignedIn, isLoginPage, router]);

    useEffect(() => {
        if (!currentUser?.needsRoleBootstrap || bootstrapStarted.current) return;
        bootstrapStarted.current = true;
        void bootstrapLegacyOwner({}).catch((error) => {
            console.error("Legacy owner role initialization failed", error);
            setBootstrapFailed(true);
        });
    }, [bootstrapLegacyOwner, currentUser?.needsRoleBootstrap]);

    useEffect(() => {
        if (!session?.id || !currentUser || !isAdminRole(currentUser.role) || isLoginPage) return;

        if (recordedLoginSession.current !== session.id) {
            recordedLoginSession.current = session.id;
            void recordClientEvent({ action: "login", sessionId: session.id }).catch(console.error);
        }

        const viewKey = `view:${session.id}:${pathname}`;
        if (lastRecordedView.current !== viewKey) {
            lastRecordedView.current = viewKey;
            void recordClientEvent({ action: "view", sessionId: session.id, path: pathname }).catch(console.error);
        }
    }, [currentUser, isLoginPage, pathname, recordClientEvent, session?.id]);

    if (isLoginPage) return <>{children}</>;
    if (!isLoaded || (isSignedIn && currentUser === undefined)) return <LoadingScreen />;
    if (!isSignedIn) return null;
    if (currentUser?.needsRoleBootstrap && !bootstrapFailed) return <LoadingScreen />;

    if (!currentUser || !isAdminRole(currentUser.role)) {
        return <AccessDenied message="Your account does not have an assigned admin role. Ask a super admin to grant the appropriate access." />;
    }

    if (!canAccessAdminPath(currentUser.role, pathname)) {
        return <AccessDenied message="Your role does not have permission to open this admin area." />;
    }

    const userName = currentUser.name || user.fullName || user.username || "Admin";
    const userEmail = currentUser.email || user.primaryEmailAddress?.emailAddress || "";

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <AdminSidebar userRole={currentUser.role} userName={userName} userEmail={userEmail} />
            <main className="flex-1 w-full min-w-0 pb-10">{children}</main>
        </div>
    );
}
