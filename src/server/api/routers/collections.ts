import { eq } from "drizzle-orm";
import { z } from "zod";
import { collections } from "~/server/db/schema";
import type { Collection } from "~/types/collection";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const collectionsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }): Promise<Collection[]> => {
    return await ctx.db.select().from(collections);
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }): Promise<Collection | undefined> => {
      const result = await ctx.db
        .select()
        .from(collections)
        .where(eq(collections.id, input.id));
      return result[0];
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }): Promise<Collection | undefined> => {
      const [result] = await ctx.db
        .insert(collections)
        .values(input)
        .returning();
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
    .mutation(async ({ input, ctx }): Promise<Collection | undefined> => {
      const { id, ...updateData } = input;
      const [result] = await ctx.db
        .update(collections)
        .set({ ...updateData, updatedAt: new Date() })
        .where(eq(collections.id, id))
        .returning();
      return result;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }): Promise<{ success: boolean }> => {
      await ctx.db.delete(collections).where(eq(collections.id, input.id));
      return { success: true };
    }),
});
