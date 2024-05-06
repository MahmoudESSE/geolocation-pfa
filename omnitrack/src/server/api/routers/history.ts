import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { histories } from "@/server/db/schema";

export const historyRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}, from hitory api!`,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  create: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(histories).values({
        createdById: input.id,
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.histories.findMany({
      orderBy: (histories, { desc }) => [desc(histories.savedAt)],
    });
  }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.histories.findFirst({
      orderBy: (histories, { desc }) => [desc(histories.savedAt)],
    });
  }),
});
