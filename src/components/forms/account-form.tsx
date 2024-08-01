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
import { Eye, EyeOff } from "lucide-react"

const CustomerSchema = z.object({
    name: z.string().min(2, 'Missing name'),
    email: z.string().email('Missing email'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    phone: z.string().nullable().optional(),
})

interface AccountFormProps {
    user?: {
        name: string;
        email: string;
        phone: string | null;
    } | null;
}

const AccountForm = ({user}: AccountFormProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof CustomerSchema>>({
        mode: 'onChange',
        resolver: zodResolver(CustomerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            phone: '',
        },
    });


    const onSubmit = async (values: z.infer<typeof CustomerSchema>) => {
        console.log(values)
    }

    useEffect(() => {
        form.reset({
            name: user?.name ?? '',
            email: user?.email ?? '',
            phone: user?.phone ?? '',
        })
    }, [user, form])
    

    return (
        <Form {...form}>
            <form
                className="flex w-full flex-col gap-y-6 py-8 px-12"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    disabled={isLoading}
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
                    disabled={isLoading}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email*</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone*</FormLabel>
                            <FormControl>
                                <Input placeholder="Add your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password*</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input type={isVisible ? "text" : "password"} placeholder="Update your password" {...field} />
                                    <span onClick={() => { setIsVisible(!isVisible) }} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                                        {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </span>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update Account</Button>
            </form>
        </Form>
    )
}

export default AccountForm