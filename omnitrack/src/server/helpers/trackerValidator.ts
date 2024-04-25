import { z } from "zod";

export const TrackerSchema = z.object({
        longtitude: z.number().refine((n) => {
                return !z.number().int().safeParse(n).success && z.number().finite().safeParse(n).success;
        }, "should not be an integer"),
        latitude: z.number().refine((n) => {
                return !z.number().int().safeParse(n).success && z.number().finite().safeParse(n).success;
        }, "should not be an integer"),
        imei: z.bigint(),
});

export type TrackerType = z.infer<typeof TrackerSchema>;
