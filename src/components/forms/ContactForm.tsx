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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "@/lib/slices/userSlice";
import { getProfile, updateAddress } from "@/lib/manage-account";
import { toast } from "sonner"
import { states } from "@/lib/constant";


const CheckoutDetailsSchema = z.object({
    name: z.string().min(2, 'Missing name'),
    email: z.string().email('Missing email'),
    phone: z.string().optional(),
    state: z.string().default(''),
    city: z.string().min(3, 'Missing city'),
    address: z.string().min(3, 'Missing address'),
    pincode: z.string().min(6, 'Missing pincode'),
})


const ContactForm = ({setIsValid}: {setIsValid: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userProfile);

    const form = useForm<z.infer<typeof CheckoutDetailsSchema>>({
        mode: 'onChange',
        resolver: zodResolver(CheckoutDetailsSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            state: user?.state ?? '',
            city: '',
            address: '',
            pincode: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof CheckoutDetailsSchema>) => {
        try {
            setIsLoading(true);
            await updateAddress(values)
            toast.success('Details updated')
            setIsValid(true);
        } catch (error) {
            console.error(error);
            toast.error('Failed to update account');
            setIsValid(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const profile = await getProfile()
            dispatch(setUserProfile(profile))
            setIsLoading(false);
        }

        fetchProfile()

        form.reset({
            name: user?.name ?? '',
            email: user?.email ?? '',
            phone: user?.phone ?? '',
            state: user?.state ?? '',
            city: user?.city ?? '',
            address: user?.address ?? '',
            pincode: user?.pincode ?? '',
        });

        const isFilled = Object.values(form.getValues()).every(Boolean);
        setIsValid(isFilled);

    }, [user, form, dispatch])

    return (
        <Form {...form}>
            <form
                className="flex w-full flex-col gap-y-6 py-8 md:px-12 px-2"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name*</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email*</FormLabel>
                                <FormControl>
                                    <Input disabled={true} readOnly placeholder="Enter your email address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="Add your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel>Country*</FormLabel>
                        <FormControl>
                            <Input disabled={true} value={"India"} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State*</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a state" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent >
                                        {states.map((state) => (
                                            <SelectItem key={state} value={state}>
                                                {state}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City*</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your city name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address*</FormLabel>
                            <FormControl>
                                <Input placeholder="1234 Main Street, Near ABC college" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pincode*</FormLabel>
                                <FormControl>
                                    <Input placeholder="XXXXXX"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={isLoading} type="submit">Save Details</Button>
            </form>
        </Form>
    )
}

export default ContactForm