import { employeeRouter } from "./router/employee";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  employee: employeeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
