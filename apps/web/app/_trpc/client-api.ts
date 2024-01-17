import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../server";

export const clientApi = createTRPCReact<AppRouter>({});