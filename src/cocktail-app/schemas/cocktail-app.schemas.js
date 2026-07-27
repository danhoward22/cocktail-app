import {z} from "zod";
import { units, isValidQuantity } from "../utils/unitUtils";

export const cocktailSchema = z.object({
    name: z.string().min(1).max(255),
    source: z.string().max(255),
    notes: z.string().max(1000),
    ingredients: z.array(
        z.object({
            id: z.number().min(1, "Select an ingredient"),
            qty: z.string(),
            units: z.enum([...units, ""]),
        }).refine(
            (data) => isValidQuantity(data.qty),
            {
                message: "Quantity must be a positive decimal or fraction.",
                path:["qty"]
            }
        )
    ).min(1, 'Add at least one ingredient'),
    garnishes: z.array(
        z.object({
            //id: z.number().min(1),
            qty: z.string(),
        }).refine(
            (data) => isValidQuantity(data.qty),
            {
                message: "Quantity must be a positive decimal or fraction.",
                path:["qty"]
            }
        )
    ),
});



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
