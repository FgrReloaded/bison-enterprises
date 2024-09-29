"use client"
import { deleteCategory, getCategories } from '@/actions/admin/category'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SquareDashedKanban } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const CategoriesTable = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const { data: catetgories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
    })

    const { mutate } = useMutation({
        mutationFn: deleteCategory,
        onSuccess: (succes: boolean) => {
            if (!succes) return;
            queryClient.setQueryData(['categories'], (oldData: any) => {});

            queryClient.invalidateQueries({
                queryKey: ['categories']
            });
            toast.success('Category deleted successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to delete category');
        }
    });

    if (isLoading) {
        return (
            <div className='w-full flex items-center justify-center flex-col gap-6 mt-6'>
                <SquareDashedKanban size={48} className='text-gray-500 dark:text-gray-400' />
                <span className='text-gray-500 dark:text-gray-400 uppercase text-4xl font-extrabold'>Loading...</span>
            </div>
        )
    }

    if (catetgories?.length === 0) {
        return (
            <div className='w-full flex items-center justify-center flex-col gap-6 mt-6'>
                <SquareDashedKanban size={48} className='text-gray-500 dark:text-gray-400' />
                <span className='text-gray-500 dark:text-gray-400 uppercase text-4xl font-extrabold'>No categories found</span>
            </div>
        )
    }


    return (
        <div className="flex flex-col items-center gap-2 p-2 py-4">
            {
                catetgories && catetgories.map((category: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center px-4 py-2 shadow-lg rounded-lg my-2 gap-4 w-full ">
                        <div className="flex gap-4 md:items-center md:flex-row flex-col">
                            <p className="text-lg font-bold">
                                {category.name}
                            </p>
                        </div>
                        <div className="flex gap-4 items-center pr-4">
                            <button className="cursor-pointer">
                                Edit
                            </button>
                            <button onClick={()=>{mutate(category.id)}} className="cursor-pointer">
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CategoriesTable