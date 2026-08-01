import {z} from "zod";

export const ingredientSchema = z.object({
    ingredientName: z.string().trim().min(1, "Enter an ingredient name").max(255, "Name is too long (255 max characters)"),
    parentId: z.number(),
});
