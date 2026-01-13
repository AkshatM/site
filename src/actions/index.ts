import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro/zod';
import type { PostsDO } from '../posts-do';

function getPostsStub(context: { locals: App.Locals }): DurableObjectStub<PostsDO> {
  const ns = context.locals.runtime.env.POSTS;
  const id = ns.idFromName('global');
  return ns.get(id);
}

export const server = {
  upvote: defineAction({
    input: z.object({
      post: z.string(),
    }),
    handler: async (input, context) => {
      const stub = getPostsStub(context);
      let nextValue: number;
      try {
        nextValue = await stub.upvote(input.post);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`DO operation for ${input.post} failed:`, error.message);
        } else {
          console.error("An unknown error occurred");
        }
        throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: "Error writing to Durable Object",
        })
      }

      context.session?.set(input.post, "true");
      return nextValue;
    }
  }),
  getUpvotes: defineAction({
    input: z.object({
      post: z.string(),
    }),
    handler: async (input, context) => {
      const stub = getPostsStub(context);
      try {
        return await stub.getUpvotes(input.post);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Posts DO operation for ${input.post} failed:`, error.message);
        } else {
          console.error(`An unknown error occurred: ${error}`);
        }
        throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: "Error reading from Durable Object",
        })
      }
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