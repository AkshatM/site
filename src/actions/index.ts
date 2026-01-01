import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro/zod';

export const server = {
  upvote: defineAction({
    input: z.object({
      post: z.string(),
    }),
    handler: async (input, context) => {
      let kv = context.locals.runtime.env.POSTS;
      let response: string | null = '';
      try {
        response = await kv.get(input.post);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`KV operation for ${input.post} failed:`, error.message);
        } else {
          console.error("An unknown error occurred");
        }
        throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: "Error writing to KV",
        })
      }

      const current_value = response ? Number(response) : 0;
      const next_value = current_value + 1;
      await kv.put(input.post, next_value.toString());
      await context.session?.set(input.post, "true");
      return next_value;
    }
  }),
  getUpvotes: defineAction({
    input: z.object({
      post: z.string(),
    }),
    handler: async (input, context) => {
      let kv = context.locals.runtime.env.POSTS;
      let response: string | null = '';
      try {
        response = await kv.get(input.post);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Posts KV operation for ${input.post} failed:`, error.message);
        } else {
          console.error(`An unknown error occurred: ${error}`);
        }
        throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: "Error writing to KV",
        })
      }

      return response ? Number(response) : 0;
    }
  }),
  hasUpvoted: defineAction({
    input: z.object({
      post: z.string(),
    }),
    handler: async (input, context) => {
      const response = await context.session?.get(input.post);
      return response === "true";
    }
  }),
}