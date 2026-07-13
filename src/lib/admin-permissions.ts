export const ADMIN_ROLES = [
    "super_admin",
    "editor",
    "ministry_leader",
    "finance_admin",
] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export const ROLE_LABELS: Record<AdminRole, string> = {
    super_admin: "Super Admin",
    editor: "Editor",
    ministry_leader: "Ministry Leader",
    finance_admin: "Finance Admin",
};

export const ROLE_CAPABILITIES: Record<AdminRole, readonly string[]> = {
    super_admin: ["All admin areas", "Users and roles", "Settings", "Audit log"],
    editor: ["Website content", "Blog posts", "Sermons and media", "Events"],
    ministry_leader: ["Events and registrations", "Ministries", "Contact messages"],
    finance_admin: ["Projects and progress", "Giving methods"],
};

export function isAdminRole(role: unknown): role is AdminRole {
    return typeof role === "string" && (ADMIN_ROLES as readonly string[]).includes(role);
}

const ROUTE_ROLES: Array<{ prefix: string; roles: readonly AdminRole[] }> = [
    { prefix: "/admin/settings", roles: ["super_admin"] },
    { prefix: "/admin/content", roles: ["super_admin", "editor"] },
    { prefix: "/admin/media", roles: ["super_admin", "editor"] },
    { prefix: "/admin/events", roles: ["super_admin", "editor", "ministry_leader"] },
    { prefix: "/admin/projects", roles: ["super_admin", "finance_admin"] },
    { prefix: "/admin/giving", roles: ["super_admin", "finance_admin"] },
    { prefix: "/admin/ministries", roles: ["super_admin", "ministry_leader"] },
    { prefix: "/admin/connect", roles: ["super_admin", "ministry_leader"] },
];

export function canAccessAdminPath(role: AdminRole, pathname: string) {
    if (pathname === "/admin") return true;
    const rule = ROUTE_ROLES.find(({ prefix }) => pathname.startsWith(prefix));
    return rule ? rule.roles.includes(role) : false;
}

export function canManageProjects(role: AdminRole) {
    return role === "super_admin" || role === "finance_admin";
}

export function canViewAudit(role: AdminRole) {
    return role === "super_admin";
}

export function canManageContacts(role: AdminRole) {
    return role === "super_admin" || role === "ministry_leader";
}
