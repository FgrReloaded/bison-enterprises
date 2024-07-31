"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { createUser } from "../_actions/user-auth"

const CustomerSchema = z.object({
    name: z.string().min(2, 'Missing name'),
    email: z.string().email('Missing email'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export default function SignUp() {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof CustomerSchema>>({
        mode: 'onChange',
        resolver: zodResolver(CustomerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });


    const onSubmit = async (values: z.infer<typeof CustomerSchema>) => {
        setIsLoading(true);
        await createUser(values);
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form
                className="flex md:w-[30%] flex-col gap-y-6 border-1 border py-8 px-12 rounded-lg shadow-lg"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col items-center gap-2">
                    <ShoppingCart size={48} />
                    <h1 className="text-2xl font-semibold">Online Store</h1>
                    <p className="text-gray-500">Create a new account</p>
                </div>
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password*</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input type={isVisible ? "text" : "password"} placeholder="Enter your password" {...field} />
                                    <span onClick={() => { setIsVisible(!isVisible) }} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                                        {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </span>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Create New Account</Button>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500 text-sm">Already have an account? <Link href={"/sign-in"} className="text-blue-500 underline">sign in </Link></p>

                </div>
            </form>
        </Form>
    )
}
