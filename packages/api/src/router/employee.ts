import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
});


export const employeeRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    let start, end;

    const client = await pool.connect();

    start = performance.now();
    await client.query('SELECT 1;');
    end = performance.now();
    console.log(`postgres connection check query took::: ${end - start}ms`);

    start = performance.now();
    await client.query('SELECT * from test_employee;');
    end = performance.now();
    console.log(`postgres findMany employees took::: ${end - start}ms`);

    start = performance.now();
    await prisma.$executeRaw`SELECT 1;`;
    end = performance.now();
    console.log(`prisma connection check query took::: ${end - start}ms`);

    start = performance.now();
    const result = await prisma.testEmployee.findMany({ orderBy: { id: "desc" } });
    end = performance.now();
    console.log(`prisma findMany employees took::: ${end - start}ms`);

    client.release();
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
