import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

// This following routes will provide the logic to manage magic link generation and verification.

export const authRouter = createTRPCRouter({
  
});