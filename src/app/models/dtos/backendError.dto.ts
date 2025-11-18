import { z } from 'zod';

export const backendError = z.object({
  message: z.string(),
});

export type BackendError = z.infer<typeof backendError>;

export function parseErrorDTO(source: unknown) {
  return backendError.safeParse(source);
}
