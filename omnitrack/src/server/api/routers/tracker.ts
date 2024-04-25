import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { trackers } from "@/server/db/schema";
import { TrackerSchema } from "@/server/helpers/trackerValidator";

export const trackerRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}, from trackers api!`,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  create: protectedProcedure
    .input(TrackerSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(trackers).values({
        monitoredById: ctx.session.user.id,
        longtitude: input.longtitude,
        latitude: input.latitude,
        imei: input.imei,
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.trackers.findMany({
      orderBy: (trackers, { desc }) => [desc(trackers.createdAt)]
    })
  }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.trackers.findFirst({
      orderBy: (trackers, { desc }) => [desc(trackers.createdAt)],
    });
  }),
});
