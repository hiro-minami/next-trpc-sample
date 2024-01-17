import { z } from "zod";

import { publicProcedure, router } from "./trpc";
import { PrismaClient } from "@prisma/client";
import { Storage } from '@google-cloud/storage';

// ...

const storage = new Storage({
  apiEndpoint: 'http://localhost:4443', // fake-gcs-serverのアドレス
  projectId: 'test', // fake-gcs-serverでは任意の値でOK
  credentials: { client_email: 'test', private_key: 'test' }, // fake-gcs-serverでは任意の値でOK
});
const bucketName = 'html-crawler'; // 作成するバケット名に置き換えてください

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

  getHtml: publicProcedure
  .input(z.object({ url: z.string() }))
  .query(async (opts) => {
    console.log('url', opts.input.url)
    const fileUrl = await prisma.htmlStorageMapping.findFirst({
      where: {
        url: opts.input.url
      }
    })
    console.log('storageUrl', fileUrl?.storageUrl)
    
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileUrl?.storageUrl ?? "");
    const a = await file.download()
    console.log('file', a)
    return { a };
  }),

  fetcher: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async (opts) => {
      const res = await fetch(opts.input.url);
      const body = await res.text();

      // HTMLファイルをローカルのGCSにアップロード
      const fileName = new URL(opts.input.url).hostname + '.html';
      console.log(fileName)
      const bucket = storage.bucket(bucketName);
      const file = bucket.file(fileName);
      await file.save(body);
      await prisma.htmlStorageMapping.create({
        data: {
          url: opts.input.url,
          storageUrl: `${bucketName}/${fileName}`
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