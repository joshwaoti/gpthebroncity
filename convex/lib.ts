import { MutationCtx, QueryCtx } from "./_generated/server";

export const ADMIN_ROLES = [
    "super_admin",
    "editor",
    "ministry_leader",
    "finance_admin",
] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export type AdminPermission =
    | "dashboard:view"
    | "content:manage"
    | "media:manage"
    | "events:manage"
    | "projects:manage"
    | "giving:manage"
    | "ministries:manage"
    | "contacts:manage"
    | "settings:manage"
    | "users:manage"
    | "audit:view";

export type AuditAction =
    | "create"
    | "update"
    | "delete"
    | "publish"
    | "archive"
    | "status_change"
    | "invite"
    | "login"
    | "logout"
    | "view"
    | "sync";

const ROLE_PERMISSIONS: Record<AdminRole, readonly AdminPermission[]> = {
    super_admin: [
        "dashboard:view",
        "content:manage",
        "media:manage",
        "events:manage",
        "projects:manage",
        "giving:manage",
        "ministries:manage",
        "contacts:manage",
        "settings:manage",
        "users:manage",
        "audit:view",
    ],
    editor: ["dashboard:view", "content:manage", "media:manage", "events:manage"],
    ministry_leader: ["dashboard:view", "events:manage", "ministries:manage", "contacts:manage"],
    finance_admin: ["dashboard:view", "projects:manage", "giving:manage"],
};

export function isAdminRole(role: unknown): role is AdminRole {
    return typeof role === "string" && (ADMIN_ROLES as readonly string[]).includes(role);
}

/** Require a signed-in Clerk identity. */
export async function requireAuth(ctx: QueryCtx | MutationCtx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
        throw new Error("Unauthenticated: you must be signed in to perform this action.");
    }
    return identity;
}

/**
 * Require a specific administrative permission. The Convex users table,
 * synchronized from Clerk, is the authorization source of truth. Missing and
 * unknown roles fail closed.
 */
export async function requirePermission(
    ctx: QueryCtx | MutationCtx,
    permission: AdminPermission,
) {
    const identity = await requireAuth(ctx);
    const user = await ctx.db
        .query("users")
        .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
        .unique();

    if (!user || !isAdminRole(user.role)) {
        throw new Error("Forbidden: your account does not have an assigned admin role.");
    }

    if (!ROLE_PERMISSIONS[user.role].includes(permission)) {
        throw new Error(`Forbidden: the ${user.role} role cannot perform this action.`);
    }

    return { identity, user };
}

export async function requireAdmin(ctx: QueryCtx | MutationCtx) {
    return await requirePermission(ctx, "dashboard:view");
}

export async function requireSuperAdmin(ctx: QueryCtx | MutationCtx) {
    return await requirePermission(ctx, "users:manage");
}

/** Write a trusted audit entry from inside an administrative mutation. */
export async function logAction(
    ctx: MutationCtx,
    args: {
        action: AuditAction;
        entityType: string;
        entityId?: string;
        details?: string;
    },
) {
    const identity = await ctx.auth.getUserIdentity();
    const user = identity
        ? await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique()
        : null;
    const details = args.details
        ?.replace(/[\r\n\t]+/g, " ")
        .trim()
        .slice(0, 1000);

    await ctx.db.insert("auditLog", {
        action: args.action,
        entityType: args.entityType,
        entityId: args.entityId,
        userId: identity?.subject ?? "system",
        userName: user?.name ?? identity?.name ?? identity?.givenName ?? "System",
        userEmail: user?.email ?? identity?.email,
        actorRole: isAdminRole(user?.role) ? user.role : undefined,
        details: details || undefined,
        timestamp: Date.now(),
    });
}
