"use server";

import { auth, signIn } from "@/auth";

export const handleSignIn = async () => {
await signIn();
};
