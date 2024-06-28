import { eq } from "drizzle-orm";
import { z } from "zod";
import { items } from "~/server/db/schema";
import type { Item } from "~/types/item";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const itemsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }): Promise<Item[]> => {
    return await ctx.db.select().from(items);
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }): Promise<Item | undefined> => {
      const result = await ctx.db
        .select()
        .from(items)
        .where(eq(items.id, input.id));
      return result[0];
    }),

  getByItemId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }): Promise<Item[]> => {
      return await ctx.db
        .select()
        .from(items)
        .where(eq(items.collectionId, input.id));
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        collectionId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }): Promise<Item | undefined> => {
      const [result] = await ctx.db.insert(items).values(input).returning();
      return result;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }): Promise<Item | undefined> => {
      const { id, ...updateData } = input;
      const [result] = await ctx.db
        .update(items)
        .set({ ...updateData, updatedAt: new Date() })
        .where(eq(items.id, id))
        .returning();
      return result;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }): Promise<{ success: boolean }> => {
      await ctx.db.delete(items).where(eq(items.id, input.id));
      return { success: true };
    }),
});
