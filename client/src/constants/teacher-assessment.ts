import { z } from "zod";

export const teacherAssessmentCreationSchema = z.object({
  topic: z
    .string(),
  type: z.enum(["mcq", "open_ended"]),
  amount: z.string(),
});
