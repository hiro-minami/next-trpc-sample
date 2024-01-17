import { z } from "zod";

import { publicProcedure, router } from "./trpc";

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
      console.log(opts.input.url)
      const res = await fetch(opts.input.url);
      const body = await res.text();
      return { url: opts.input.url, body };
    }),

  parser: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation((opts) => {
      return { msg: `Hello ${opts.input.url ?? "World"}` };
    }),
});

export type AppRouter = typeof appRouter;