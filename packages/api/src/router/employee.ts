import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const employeeRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    let start, end;

    start = performance.now();
    await prisma.$executeRaw`SELECT 1;`;
    end = performance.now();
    console.log(`connection check query took::: ${end - start}ms`);

    start = performance.now();
    const result = await prisma.testEmployee.findMany({ orderBy: { id: "desc" } });
    end = performance.now();
    console.log(`findMany employees took::: ${end - start}ms`);
    return result;
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        title: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.testEmployee.create({
        data: {
          ...input,
          internalId: uuidv4(),
        },
      });
    }),
  delete: publicProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.prisma.testEmployee.delete({ where: { id: input } });
  }),
});
