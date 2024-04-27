import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";

import { trackers } from "@/server/db/schema";
import { TrackerSchema } from "@/server/helpers/trackerValidator";
import { eq } from "drizzle-orm";

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
            orderBy: (trackers, { desc }) => [desc(trackers.createdAt)],
        });
    }),

    getLatest: protectedProcedure.query(({ ctx }) => {
        return ctx.db.query.trackers.findFirst({
            orderBy: (trackers, { desc }) => [desc(trackers.createdAt)],
        });
    }),

    configureSpeed: protectedProcedure
        .input(
            z.object({
                speed: z.number().refine((n) => {
                    return (
                        !z.number().int().safeParse(n).success &&
                        z.number().finite().safeParse(n).success
                    );
                }),
                imei: z.bigint(),
            }),
        )
        .query(async ({ ctx, input }) => {
            await ctx.db
                .update(trackers)
                .set({
                    speed: input.speed,
                })
                .where(eq(trackers.imei, input.imei))
                .returning({ updatedId: trackers.id });
        }),
});
