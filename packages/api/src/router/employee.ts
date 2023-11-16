import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const employeeRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    console.log("kkkk::::", process.env);
    return ctx.prisma.testEmployee.findMany({ orderBy: { id: "desc" } });
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
