import { createMiddleware } from 'hono/factory';

export const responseSerialize = (schema: Zod.Schema) =>
  createMiddleware(async (c, next) => {
    await next();

    if (!c.res.headers.get('content-type')?.startsWith('application/json')) {
      throw new Error('Content type is not JSON');
    }

    const value = await c.res.json();
    const result = schema.safeParse(value);

    if (!result.success) {
      // throw new Error('Schema parse failed');
      throw new Error(result.error.message);
    }

    c.res = new Response(JSON.stringify(result.data));
  });
