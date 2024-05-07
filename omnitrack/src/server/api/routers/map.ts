import { env } from "@/env";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const mapRouter = createTRPCRouter({
  mapAccessToken: protectedProcedure.query(async ({ }) => {
    return {
      mapAccessToken: env.MAPBOX_ACCESS_TOKEN,
      mapStyle: env.MAPBOX_BASIC_STYLE_URL,
    };
  }),

  reverseGeocoding: protectedProcedure.query(async ({ }) => {
    // TODO: get geocoding text from: https://api.mapbox.com/search/geocode/v6/reverse?longitude={longitude}&latitude={latitude}
    return {};
  }),
});
