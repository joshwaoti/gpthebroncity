"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function HomepageContentAdmin() {
    return (
        <div>
            <AdminHeader
                title="Homepage Content"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Homepage" }]}
            />
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Hero Section</h2>
                    <Button>Edit Hero</Button>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                    <p className="text-muted-foreground text-sm">Configure the main headline, subtitle, and primary call to action for the website's landing page.</p>
                </div>
            </div>
        </div>
    );
}
