import { z } from "zod";

import { publicProcedure, router } from "./trpc";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const appRouter = router({
  greeting1: publicProcedure.query(() => {
    return { msg: "Hello World" };
  }),

  greeting2: publicProcedure
    .input(z.object({ name: z.string() }))
    .query((opts) => {
      return { msg: `Hello ${opts.input.name ?? "World"}` };
    }),

  fetcher: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async (opts) => {
      const res = await fetch(opts.input.url);
      const body = await res.text();

      await prisma.htmlStorageMapping.create({
        data: {
          url: opts.input.url,
          storageUrl:opts.input.url,
        }
      
      })
      return { url: opts.input.url, body };
    }),

  parser: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation((opts) => {
      return { msg: `Hello ${opts.input.url ?? "World"}` };
    }),
});

export type AppRouter = typeof appRouter;