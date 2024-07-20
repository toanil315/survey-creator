import { z } from 'zod';

export class ZodUtils {
  static zodAlwaysRefine<T extends z.ZodTypeAny>(zodType: T) {
    return z.any().superRefine(async (value, ctx) => {
      const res = await zodType.safeParseAsync(value);

      if (res.success === false)
        for (const issue of res.error.issues) {
          ctx.addIssue(issue);
        }
    }) as unknown as T;
  }
}
