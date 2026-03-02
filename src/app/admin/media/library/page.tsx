"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function MediaLibraryPage() {
    return (
        <div>
            <AdminHeader
                title="Media Library"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Media" }, { label: "Library" }]}
            />
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Image & Video Assets</h2>
                    <Button className="gap-2"><Upload className="w-4 h-4" /> Upload Asset</Button>
                </div>
                <div className="bg-card border border-border rounded-xl p-10 text-center">
                    <p className="text-muted-foreground">Media library grid will be implemented here using responsive asset cards.</p>
                </div>
            </div>
        </div>
    );
}
