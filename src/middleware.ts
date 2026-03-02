import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Match all /admin routes
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
// Match the login page and ALL its sub-paths (needed for Clerk's catch-all [[...rest]])
const isPublicRoute = createRouteMatcher(["/admin/login(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    // Protect all /admin routes EXCEPT /admin/login and its sub-paths
    if (isAdminRoute(req) && !isPublicRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
