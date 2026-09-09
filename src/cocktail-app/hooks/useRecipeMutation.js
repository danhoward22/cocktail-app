import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { usePersistentToast } from "./usePersistentToast"

export function useRecipeMutation(queryKeys, createFn, updateFn){

    const queryClient = useQueryClient()
    const persistentToast = usePersistentToast("Saving...")

    const {mutateAsync: createMutation } = useMutation({
        mutationFn: createFn,
        onMutate: () => {
            persistentToast.show()
        },
        onSuccess: (result) => {
            queryClient.setQueryData(queryKeys.detail(result.id), result)
            queryClient.invalidateQueries({ queryKey: queryKeys.lists() })
            toast.success(`${result.name} saved!`)
        },
        onError: (error, variables) => {
            let messages = `${variables.name} failed to save: ${error.message}`
            toast.error(messages)
            if(error instanceof AggregateError){
                messages += `:\n` + error.errors.map(e => `- ${e.message}`).join("\n")
            }
            console.error(messages)
        },
        onSettled: () => {
            persistentToast.clear()
        }
    })

    const {mutateAsync: updateMutation } = useMutation({
        mutationFn: (newItem) => updateFn(newItem),
        onMutate: () => {
            persistentToast.show()
        },
        onSuccess: (result) => {
            queryClient.setQueryData(queryKeys.detail(result.id), result)
            queryClient.invalidateQueries({ queryKey: queryKeys.lists() })
            toast.success(`${result.name} saved!`)
        },
        onError: (error, variables) => {
            let messages = `${variables.name} failed to update: ${error.message}`
            toast.error(messages)
            if(err instanceof AggregateError){
                messages += `:\n` + error.errors.map(e => `- ${e.message}`).join("\n")
            }
            console.error(messages)
        },
        onSettled: () => {
            persistentToast.clear()
        }
    })

    return {createMutation, updateMutation}
}