import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro/zod';

export const server = {
  incrementUpvote: defineAction({
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
      
      if (!Number.isNaN(current_value)) {
          const next_value = current_value + 1;
          await kv.put(input.post, next_value.toString());
          return next_value;
      } else {
          throw new ActionError({
            code: 'CONTENT_TOO_LARGE',
            message: 'Upvotes counter is at maximum value',
        });
      }
    }
  })
}