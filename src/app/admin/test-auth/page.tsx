"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useUser, useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AuthTestPage() {
    const authStatus = useQuery(api.debug.checkAuth);
    const envCheck = useQuery(api.debug.envCheck);
    const testMutation = useMutation(api.debug.testMutation);
    const { user, isSignedIn } = useUser();
    const { getToken } = useAuth();
    const [mutationResult, setMutationResult] = useState<any>(null);
    const [mutationError, setMutationError] = useState<any>(null);
    const [tokenInfo, setTokenInfo] = useState<any>(null);

    // Decode the JWT Clerk sends to Convex (without verifying)
    useEffect(() => {
        async function inspectToken() {
            try {
                const token = await getToken({ template: "convex" });
                if (token) {
                    const parts = token.split(".");
                    const payload = JSON.parse(atob(parts[1]));
                    setTokenInfo({
                        hasToken: true,
                        iss: payload.iss,
                        aud: payload.aud,
                        sub: payload.sub,
                        exp: new Date(payload.exp * 1000).toISOString(),
                        iat: new Date(payload.iat * 1000).toISOString(),
                    });
                } else {
                    setTokenInfo({ hasToken: false, error: "getToken returned null" });
                }
            } catch (err: any) {
                setTokenInfo({ hasToken: false, error: err.message });
            }
        }
        if (isSignedIn) inspectToken();
    }, [isSignedIn, getToken]);

    const handleTestMutation = async () => {
        try {
            const result = await testMutation({});
            setMutationResult(result);
            setMutationError(null);
        } catch (err) {
            setMutationError(err);
            setMutationResult(null);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Auth Debug (Production)</h1>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h2 className="font-semibold mb-2">1. Clerk (Client-side)</h2>
                <p>Signed In: {isSignedIn ? "YES ✅" : "NO ❌"}</p>
                <p>User ID: {user?.id || "N/A"}</p>
                <p>Email: {user?.primaryEmailAddress?.emailAddress || "N/A"}</p>
                <p>Role: {JSON.stringify(user?.publicMetadata)}</p>
            </div>

            <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                <h2 className="font-semibold mb-2">2. Clerk JWT Token (sent to Convex)</h2>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                    {JSON.stringify(tokenInfo, null, 2)}
                </pre>
            </div>
            
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <h2 className="font-semibold mb-2">3. Convex Query (checkAuth) — does Convex see the identity?</h2>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                    {JSON.stringify(authStatus, null, 2)}
                </pre>
            </div>

            <div className="mb-6 p-4 bg-cyan-50 rounded-lg">
                <h2 className="font-semibold mb-2">4. Convex Env Vars (what auth.config.ts resolves to)</h2>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                    {JSON.stringify(envCheck, null, 2)}
                </pre>
            </div>
            
            <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                <h2 className="font-semibold mb-2">5. Convex Mutation Test</h2>
                <Button onClick={handleTestMutation} className="mb-4">
                    Test Mutation
                </Button>
                {mutationError && (
                    <div className="bg-red-100 p-4 rounded">
                        <p className="text-red-600 font-semibold">Error:</p>
                        <pre className="text-sm">{JSON.stringify(mutationError, null, 2)}</pre>
                    </div>
                )}
                {mutationResult && (
                    <div className="bg-green-100 p-4 rounded">
                        <p className="text-green-600 font-semibold">Success:</p>
                        <pre className="text-sm">{JSON.stringify(mutationResult, null, 2)}</pre>
                    </div>
                )}
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
                <h2 className="font-semibold mb-2">6. Frontend Environment</h2>
                <p>Convex URL: {process.env.NEXT_PUBLIC_CONVEX_URL}</p>
                <p>Clerk Key Prefix: {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.substring(0, 8)}...</p>
                <p className="text-xs text-gray-500 mt-1">
                    (pk_test = dev, pk_live = production)
                </p>
            </div>
        </div>
    );
}

