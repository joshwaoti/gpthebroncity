"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Doc, Id } from "@/../convex/_generated/dataModel";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, Trash2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { AdminPagination } from "@/components/admin/pagination";

export default function ConnectPage() {
  const submissions = useQuery(api.contact.list);
  type ContactDoc = Doc<"contacts">;
  const markRead = useMutation(api.contact.updateStatus);
  const destroy = useMutation(api.contact.remove);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "new" | "read" | "replied">(
    "all",
  );
  const [selected, setSelected] = useState<ContactDoc | null>(null);
  const [deleteId, setDeleteId] = useState<Id<"contacts"> | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered =
    submissions?.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.message.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "all" || s.status === filter;
      return matchSearch && matchFilter;
    }) || [];

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  if (currentPage > 1 && paginatedItems.length === 0 && filtered.length > 0) {
    setCurrentPage(1);
  }

  const handleMarkRead = async (id: Id<"contacts">) => {
    await markRead({ id, status: "read" as const });
  };

  const handleResolve = async (id: Id<"contacts">) => {
    await markRead({ id, status: "replied" as const });
    if (selected?._id === id) setSelected(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await destroy({ id: deleteId });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const statusColors: Record<string, string> = {
    new: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    read: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    replied:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  return (
    <div>
      <AdminHeader
        title="Contact Messages"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Connect" }]}
      />
      <div className="p-6">
        {/* Search + filter */}
        <div className="flex gap-3 mb-6 flex-col sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#257300]"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "new", "read", "replied"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize",
                  filter === f
                    ? "bg-[#257300] text-white"
                    : "bg-card border border-border text-muted-foreground hover:border-[#257300]/50",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* List */}
          <div className="space-y-2">
            {!filtered ? (
              <p className="text-center py-8 text-muted-foreground">
                Loading...
              </p>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Mail className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p>No messages found</p>
              </div>
            ) : (
              paginatedItems.map((sub) => (
                <div
                  key={sub?._id}
                  onClick={async () => {
                    setSelected(sub);
                    if (sub.status === "new") await handleMarkRead(sub?._id);
                  }}
                  className={cn(
                    "bg-card border rounded-xl p-4 cursor-pointer transition-all",
                    selected?._id === sub?._id
                      ? "border-[#257300] shadow-sm"
                      : "border-border hover:border-[#257300]/30",
                    sub.status === "new" && "border-l-2 border-l-orange-400",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-semibold text-foreground text-sm">
                          {sub.name}
                        </p>
                        {sub.status === "new" && (
                          <span className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {sub.email}
                      </p>
                      {sub.phone && (
                        <p className="text-xs text-muted-foreground">
                          {sub.phone}
                        </p>
                      )}
                      {sub.subject && (
                        <p className="text-[11px] mt-1 inline-block rounded-full px-2 py-0.5 bg-accent text-foreground">
                          {sub.subject}
                        </p>
                      )}
                      <p className="text-xs text-foreground mt-2 line-clamp-2">
                        {sub.message}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0",
                        statusColors[sub.status] || "bg-zinc-100 text-zinc-600",
                      )}
                    >
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">
                    {new Date(sub._creationTime).toLocaleString("en", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))
            )}
            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

          {/* Detail panel */}
          <div className="hidden lg:block">
            {selected ? (
              <div className="bg-card border border-border rounded-xl p-5 sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">
                    Message Details
                  </h3>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3 mb-5">
                  <div>
                    <p className="text-xs text-muted-foreground">From</p>
                    <p className="text-sm font-semibold text-foreground">
                      {selected.firstName} {selected.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selected.email}
                    </p>
                    {selected.phone && (
                      <p className="text-xs text-muted-foreground">
                        {selected.phone}
                      </p>
                    )}
                  </div>
                  {selected.subject && (
                    <div>
                      <p className="text-xs text-muted-foreground">Subject</p>
                      <p className="text-sm font-medium text-foreground capitalize">
                        {selected.subject}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Message
                    </p>
                    <div className="bg-accent rounded-lg p-3 text-sm text-foreground leading-relaxed">
                      {selected.message}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(selected._creationTime).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject ?? "Your message"}&body=Dear ${selected.firstName ?? selected.name},\n\n`}
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full gap-2">
                      <Mail className="w-4 h-4" /> Reply via Email
                    </Button>
                  </a>
                  {selected.status !== "replied" && (
                    <Button
                      onClick={() => handleResolve(selected?._id)}
                      className="gap-2"
                    >
                      <CheckCircle className="w-4 h-4" /> Mark Replied
                    </Button>
                  )}
                  <button
                    onClick={() => setDeleteId(selected?._id)}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-500 transition-all border border-border"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground sticky top-6">
                <Mail className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Message"
        description="This message will be permanently deleted."
        confirmLabel="Delete Message"
      />
    </div>
  );
}
