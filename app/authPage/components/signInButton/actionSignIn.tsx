"use server";
// function
import { signIn } from "@/auth";

export const handleSignIn = async () => {
await signIn();
};
