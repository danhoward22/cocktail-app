import {z} from "zod";
import { units, isValidQuantity } from "../utils/unitUtils";

export const cocktailSchema = z.object({
    name: z.string().min(1, "Enter a cocktail name").max(255, "Name is too long (255 max characters)"),
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


//.union([z.number().min(1,"num error"), z.string().min(1,emptyQty)])
// const formSchema = z
//   .object({
//     type: z.enum(["Private", "Business"]),
//     organisationName: z.string().optional(), // Mark optional initially
//   })
//   .superRefine((data, ctx) => {
//     // If business is selected, organization name becomes mandatory
//     if (data.type === "Business" && !data.organisationName?.trim()) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Organization name is required for business accounts",
//         path: ["organisationName"], // Assigns error explicitly to this field
//       });
//     }
//   });

//cross-row refinement
// const formSchema = z.object({
//   members: z.array(
//     z.object({
//       email: z.string().email(),
//     })
//   ).superRefine((rows, ctx) => {
//     const emails = rows.map((r) => r.email);
    
//     rows.forEach((row, index) => {
//       // Check if this row's email appears elsewhere in the array
//       const isDuplicate = emails.indexOf(row.email) !== index;
      
//       if (isDuplicate && row.email !== "") {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: "This email address is already assigned to another member",
//           // Explicitly map the error path down to the exact row and field index
//           path: [index, "email"], 
//         });
//       }
//     });
//   }),
// });
