import { DurableObject } from 'cloudflare:workers';

export class PostsDO extends DurableObject<Env> {
  async getUpvotes(postId: string): Promise<number> {
    const count = await this.ctx.storage.get<number>(postId);
    return count ?? 0;
  }

  async upvote(postId: string): Promise<number> {
    const current = await this.ctx.storage.get<number>(postId) ?? 0;
    const next = current + 1;
    await this.ctx.storage.put(postId, next);
    return next;
  }
}
