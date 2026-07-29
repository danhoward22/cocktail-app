import {z} from "zod";
import { units, isValidQuantity } from "../utils/unitUtils";

export const cocktailSchema = z.object({
    cocktailName: z.string().min(1, "Enter a cocktail name").max(255, "Name is too long (255 max characters)"),
    source: z.string().max(255),
    notes: z.string().max(1000),
    ingredients: z.array(
        z.object({
            id: z.number().min(1, "Select an ingredient"),
            qty: z.string().min(1,"Enter a quantity").refine(
                (val) => isValidQuantity(val),
                { message: "Quantity must be a positive decimal or fraction." }
            ),
            units: z.enum([...units, ""]),
        })
    ).min(1, 'Add ingredients').refine(
        (rows) => new Set(rows.map((row)=>row.id)).size === rows.length,
        { message: "Cannot have duplicate ingredients" }
    ),
    garnishes: z.array(
        z.object({
            id: z.number().min(1, "Select a garnish"),
            qty: z.string().min(1,"Enter a quantity").refine(
                (val) => isValidQuantity(val),
                { message: "Quantity must be a positive decimal or fraction." }
            ),
        })
    ).refine(
        (rows) => new Set(rows.map((row)=>row.id)).size === rows.length,
        { message: "Cannot have duplicate garnishes" }
    ),
});
