import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  date: z.string().datetime("Invalid date format. Expected ISO 8601 string."),
  venue: z.string().min(3, "Venue must be at least 3 characters long"),
  capacity: z.number().int().positive("Capacity must be a positive integer"),
  location: z.array(z.number()).length(2, "Location must be an array of [longitude, latitude]").optional(),
});
