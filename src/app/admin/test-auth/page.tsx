"use client";

import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

export default function AuthTestPage() {
    const authStatus = useQuery(api.debug.checkAuth);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Auth Test</h1>
            <pre className="bg-gray-100 p-4 rounded">
                {JSON.stringify(authStatus, null, 2)}
            </pre>
        </div>
    );
}
