import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

// This following routes will provide the logic to manage seats for the firm. 
// Two main methods will be implemented:
// Assign a seat to a user, checking if there are available seats remaining, custom error message if no seats are available. 
// Revoke a seat from a user


export const seatsRouter = createTRPCRouter({
  
});