"use client";

import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function AuthTestPage() {
    const authStatus = useQuery(api.debug.checkAuth);
    const { user, isSignedIn } = useUser();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Auth Test</h1>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h2 className="font-semibold mb-2">Clerk (Client-side)</h2>
                <p>Signed In: {isSignedIn ? "YES" : "NO"}</p>
                <p>User ID: {user?.id || "N/A"}</p>
                <p>Email: {user?.primaryEmailAddress?.emailAddress || "N/A"}</p>
            </div>
            
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <h2 className="font-semibold mb-2">Convex Auth Status</h2>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                    {JSON.stringify(authStatus, null, 2)}
                </pre>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
                <h2 className="font-semibold mb-2">Environment Info</h2>
                <p>Convex URL: {process.env.NEXT_PUBLIC_CONVEX_URL}</p>
                <p>Clerk Publishable Key: {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.substring(0, 20)}...</p>
            </div>
        </div>
    );
}
