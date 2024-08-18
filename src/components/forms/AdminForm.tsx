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
import { Eye, EyeOff } from "lucide-react";
import { createSuperUser } from "@/app/(setup)/setup/_actions/create-user";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


const AdminFormSchema = z.object({
    name: z.string().min(2, 'Missing name'),
    email: z.string().email('Missing email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})


const AdminForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof AdminFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(AdminFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof AdminFormSchema>) => {
        try {
            setIsLoading(true);
            await createSuperUser(values);
            await signIn("admin", {
                email: values.email,
                password: values.password,
                callbackUrl: "/admin",
            });
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
                </div>

                <Button disabled={isLoading} type="submit">Create Admin User</Button>
            </form>
        </Form>
    )
}

export default AdminForm