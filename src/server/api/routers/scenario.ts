import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const scenarioRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().optional() }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.simplifiedQuickliScenario.create({
        data: {
          name: input.name,
          description: input.description,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const uid = ctx.session.user.id;
    const scenarios = await ctx.db.simplifiedQuickliScenario.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: uid } },
    });
    return scenarios;
  }),

  getOne: protectedProcedure
    .input(z.object({ scenarioId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const scenario = await ctx.db.simplifiedQuickliScenario.findUnique({
        where: { id: input.scenarioId },
        include: {
          createdBy: true,
        },
      });
      return scenario;
    }),
});
