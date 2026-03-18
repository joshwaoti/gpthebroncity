"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AuthTestPage() {
    const authStatus = useQuery(api.debug.checkAuth);
    const testMutation = useMutation(api.debug.testMutation);
    const { user, isSignedIn } = useUser();
    const [mutationResult, setMutationResult] = useState<any>(null);
    const [mutationError, setMutationError] = useState<any>(null);

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
            <h1 className="text-2xl font-bold mb-4">Auth Test</h1>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h2 className="font-semibold mb-2">Clerk (Client-side)</h2>
                <p>Signed In: {isSignedIn ? "YES" : "NO"}</p>
                <p>User ID: {user?.id || "N/A"}</p>
                <p>Email: {user?.primaryEmailAddress?.emailAddress || "N/A"}</p>
                <p>Role: {JSON.stringify(user?.publicMetadata)}</p>
            </div>
            
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <h2 className="font-semibold mb-2">Convex Query (checkAuth)</h2>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                    {JSON.stringify(authStatus, null, 2)}
                </pre>
            </div>
            
            <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                <h2 className="font-semibold mb-2">Convex Mutation (testMutation)</h2>
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
                <h2 className="font-semibold mb-2">Environment Info</h2>
                <p>Convex URL: {process.env.NEXT_PUBLIC_CONVEX_URL}</p>
                <p>Clerk Publishable Key: {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.substring(0, 20)}...</p>
            </div>
        </div>
    );
}
