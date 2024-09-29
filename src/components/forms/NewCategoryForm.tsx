"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { closeModal } from "@/lib/slices/modalSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/actions/admin/category";


const CategoryFormSchema = z.object({
    categoryName: z.string().min(2, 'Missing category name'),
})


const NewCategoryForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();


    const form = useForm<z.infer<typeof CategoryFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(CategoryFormSchema),
        defaultValues: {
            categoryName: '',
        },
    });

    const { mutate } = useMutation({
        mutationFn: createCategory,
        onSuccess: (newCategory: any) => {
            queryClient.setQueryData(['categories'], (oldData: any) => {
                return oldData ? [...oldData, newCategory] : [newCategory];
            });

            queryClient.invalidateQueries({
                queryKey: ['categories']
            });
            setIsLoading(false);
            dispatch(closeModal());
            toast.success('Category created successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to create category');
        }
    });


    const onSubmit = async (values: z.infer<typeof CategoryFormSchema>) => {
        try {
            setIsLoading(true);
            mutate(values);
        } catch (error) {
            console.error(error);
            toast.error('Failed to update account');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form
                className="flex w-full flex-col gap-y-6 py-8 px-12"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="categoryName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Name*</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter category name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button disabled={isLoading} type="submit">Create New Category</Button>
            </form>
        </Form>
    )
}

export default NewCategoryForm