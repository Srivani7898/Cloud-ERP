import { z } from "zod";

export const forecastRunSchema = z.object({
  model: z.string().min(2),
  horizon: z.coerce.number().min(1).max(52),
  confidence: z.coerce.number().min(50).max(99)
});
