"use client";

import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export function ConvexUserSync() {
    const { userId, isSignedIn, isLoaded: authLoaded } = useAuth();
    const { user, isLoaded: userLoaded } = useUser();
    const currentUser = useQuery(
        api.users.getByClerkId,
        userId ? { clerkId: userId } : "skip"
    );
    const createUser = useMutation(api.users.createUserFromClerk);

    // Debug: log every render with full state
    console.log("[ConvexUserSync] render:", {
        authLoaded,
        userLoaded,
        isSignedIn,
        userId,
        userName: user?.fullName,
        currentUser,
        currentUserType: typeof currentUser,
        currentUserIsNull: currentUser === null,
        currentUserIsUndefined: currentUser === undefined,
    });

    useEffect(() => {
        console.log("[ConvexUserSync] useEffect running:", {
            authLoaded,
            userLoaded,
            isSignedIn,
            userId,
            currentUser,
        });

        if (!userLoaded || !isSignedIn || !userId || !user) {
            console.log("[ConvexUserSync] Skipping: conditions not met", {
                userLoaded,
                isSignedIn,
                hasUserId: !!userId,
                hasUser: !!user,
            });
            return;
        }

        // undefined = still loading, null = not found
        if (currentUser === undefined) {
            console.log("[ConvexUserSync] Query still loading, waiting...");
            return;
        }

        if (currentUser !== null) {
            console.log("[ConvexUserSync] User already exists in Convex:", currentUser);
            return;
        }

        console.log("[ConvexUserSync] User NOT found in Convex, calling createUserFromClerk...");
        
        const args: any = { clerkId: userId };
        const name = user.fullName || user.username;
        if (name) args.name = name;
        const email = user.primaryEmailAddress?.emailAddress;
        if (email) args.email = email;
        if (user.imageUrl) args.imageUrl = user.imageUrl;

        createUser(args).then((id) => {
            console.log("[ConvexUserSync] SUCCESS! User created with ID:", id);
        }).catch((err) => {
            console.error("[ConvexUserSync] FAILED to create user:", err);
        });
    }, [authLoaded, userLoaded, isSignedIn, userId, currentUser, user, createUser]);

    return null;
}
