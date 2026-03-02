"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";

export default function AboutContentAdmin() {
    return (
        <div>
            <AdminHeader
                title="About Us Content"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "About Us" }]}
            />
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">About Our Church</h2>
                    <Button>Edit Details</Button>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                    <p className="text-muted-foreground text-sm">Manage the history, mission, vision, and leadership details shown on the About Us page.</p>
                </div>
            </div>
        </div>
    );
}
