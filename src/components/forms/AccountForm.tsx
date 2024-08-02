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
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "@/lib/slices/userSlice";
import { getProfile } from "@/lib/manage-account";
import { toast } from "sonner"

const CustomerSchema = z.object({
    name: z.string().min(2, 'Missing name'),
    email: z.string().email('Missing email'),
    phone: z.string().optional(),
})

interface AccountFormProps {
    updateAccount: (user: any) => void;
}

const AccountForm = ({ updateAccount }: AccountFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userProfile);

    const form = useForm<z.infer<typeof CustomerSchema>>({
        mode: 'onChange',
        resolver: zodResolver(CustomerSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
        },
    });


    const onSubmit = async (values: z.infer<typeof CustomerSchema>) => {
        if (values.name === user.name && values.email === user.email && values.phone === user.phone) {
            return;
        }
        setIsLoading(true);
        updateAccount(values);
        dispatch(setUserProfile(values));
        setIsLoading(false);
        toast.success('Account updated')
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const profile = await getProfile()
            dispatch(setUserProfile(profile))
        }

        fetchProfile()

        form.reset({
            name: user?.name ?? '',
            email: user?.email ?? '',
            phone: user?.phone ?? '',
        });
    }, [user, form, dispatch])


    return (
        <Form {...form}>
            <form
                className="flex w-full flex-col gap-y-6 py-8 px-12"
                onSubmit={form.handleSubmit(onSubmit)}
            >
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
                    disabled={false}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email*</FormLabel>
                            <FormControl>
                                <Input disabled={true} placeholder="Enter your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <Button disabled={isLoading} type="submit">Update Account</Button>
            </form>
        </Form>
    )
}

export default AccountForm