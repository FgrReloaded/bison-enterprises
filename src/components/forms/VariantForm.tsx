"use client"

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form, FormControl, FormLabel, FormField, FormItem, FormMessage
} from "@/components/ui/form"

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Check, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Variant } from '@prisma/client';
import { Label } from '../ui/label';
import { DialogFooter } from '../ui/dialog';
import { toast } from 'sonner';
import { createVariant } from '@/actions/admin/variant';
import { closeModal } from '@/lib/slices/modalSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const variantSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  variants: z.array(z.string()).optional(),
})

const VariantForm = () => {
  const dispatch = useDispatch();
  const [variants, setVariants] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(variantSchema),
    defaultValues: {
      name: '',
      variants: [] as Array<string>
    }
  })
  const { mutate } = useMutation({
    mutationFn: createVariant,
    onSuccess: (newVariant: any) => {
      queryClient.setQueryData(['variants'], (oldData: any) => {
        return oldData ? [...oldData, newVariant] : [newVariant];
      });

      queryClient.invalidateQueries({
        queryKey: ['variants']
      });
      dispatch(closeModal());
      toast.success('Variant created successfully');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to create variant');
    }
  });

  const onSubmit = async (values: z.infer<typeof variantSchema>) => {
    try {
      setIsLoading(true);
      mutate(values);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleVariants = (e: any) => {
    const value = e.target.value;
    if (!value) return;
    if (!value.includes(',')) return;
    const variantList = value.split(',');
    setVariants([...variants, { name: variantList[0] }]);
    const formVariants = form.getValues('variants');
    formVariants.push(variantList[0]);
    form.setValue('variants', formVariants);
    e.target.value = '';
  }

  const removeVariant = (name: string) => {
    const newVariants = variants.filter((variant: Variant) => variant.name !== name);
    setVariants(newVariants);
    form.setValue('variants', newVariants);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <div className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Variant Type Name
                  </FormLabel>
                  <FormControl>
                    <Input className='py-6' placeholder='Enter Variant Name (Eg. Size, Color)' disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Label className='mb-4'>Variants</Label>
              <Input className='py-6 mt-2' placeholder='Enter Variants (Add comma to separate)' onChange={handleVariants} disabled={isLoading} />
              <div className='flex gap-2 items-center mt-4 flex-wrap'>
                {
                  variants.map((variant: Variant) => {
                    return (
                      <div key={variant.name} className='flex items-center gap-4 bg-gray-300 px-4 py-2 rounded-xl'>
                        <span>{variant.name}</span>
                        <XCircle className='cursor-pointer' onClick={() => { removeVariant(variant.name) }} size={24} />
                      </div>
                    )
                  })
                }
              </div>
            </div>

          </div>
        </div>
        <DialogFooter className='py-4'>
          <Button type='submit' disabled={isLoading}
            className='ml-auto'>
            Add <Check className='ml-4' size={20} />
          </Button>
        </DialogFooter>
      </form>
    </Form >

  )
}

export default VariantForm