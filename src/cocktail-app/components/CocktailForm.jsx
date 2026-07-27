import { IngredientInput } from "./IngredientInput"
import SubmitButton from "/src/shared/components/ui/SubmitButton"
import ErrorMessage from "/src/shared/components/ui/ErrorMessage"
import { useCocktailForm } from "../hooks/useCocktailForm"
import styles from "./CocktailForm.module.css"


export function CocktailForm({cocktail}){

    const {
        control,
        register,
        handleSubmit,
        //setError,
        ingredientFieldArray,
        garnishFieldArray,
        formState: {errors,isSubmitting}
    } = useCocktailForm(cocktail)

    const onSubmit = async (data) => {
        console.log(data)
        // try{
        //     await new Promise((resolve) => setTimeout(resolve, 1000))
        //     throw new Error()
        //     console.log(data)
        // }catch(e){
        //     setError("email", {message: "this email is already taken"})
        //     setError("root", {message: "Submit failed!"})
        // }
    }
    
    return(
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.name}>
                <label>Name</label>
                <input type="text" {...register("name")} />
                <ErrorMessage className={styles.error} error={errors.name} />
            </div>
            <div className={styles.ingredients}>
                <label>Ingredients</label>
                <ul>
                    {ingredientFieldArray.fields.map((field, index) => 
                        <IngredientInput key={field.id} index={index} register={register} control={control} remove={ingredientFieldArray.remove} errors={errors.ingredients?.[index]} /> 
                    )}
                </ul>
                <ErrorMessage className={styles.error} error={errors.ingredients?.root} />
                <button type="button" onClick={()=>{ingredientFieldArray.append({id:0,qty:"",units:"oz"})}}>Add Ingredient</button>
            </div>
            <div className={styles.garnishes}>
                <label>Garnishes</label>
                <ul>
                    {garnishFieldArray.fields.map((field, index) => 
                        <IngredientInput key={field.id} index={index} register={register} control={control} remove={garnishFieldArray.remove} errors={errors.garnishes?.[index]} isGarnish={true} />
                    )}
                </ul>
                <ErrorMessage className={styles.error} error={errors.garnishes?.root} />
                <button type="button" onClick={()=>{garnishFieldArray.append({id:0,qty:""})}}>Add Garnish</button>
            </div>
            <div className={styles.notes}>
                <label>Notes</label>
                <textarea {...register("notes")} placeholder="Enter instructions here..." />
                <ErrorMessage className={styles.error} error={errors.notes} />
            </div>
            <div className={styles.source}>
                <label>Source</label>
                <input {...register("source")} type="text" placeholder="book title, bartender, etc." />
                <ErrorMessage className={styles.error} error={errors.source} />
            </div>
            <SubmitButton isSubmitting={isSubmitting}/>
            <ErrorMessage className={styles.error} error={errors.root} />
        </form>
    )
}

// function FieldArray() {
//   const { control, register } = useForm();
//   const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
//     control, // control props comes from useForm (optional: if you are using FormProvider)
//     name: "test", // unique name for your Field Array
//   });

//   return (
    // {fields.map((field, index) => (
    //   <input
    //     key={field.id} // important to include key with field's id
    //     {...register(`test.${index}.value`)}
    //   />
    // ))}
//   );
// }