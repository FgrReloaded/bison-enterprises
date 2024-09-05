"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "@/lib/slices/modalSlice"
import { useQuery } from "@tanstack/react-query"
import { getAdminUsers } from "@/actions/admin/user"
import { useSession } from "next-auth/react"

export default function UserPage() {
    const dispatch = useDispatch();

    const { data: admins, isLoading, error } = useQuery({
        queryKey: ['admin-users'],
        queryFn: () => getAdminUsers(),
        initialData: [],
    });
    
    return (
        <div className="flex flex-col px-2">
            <h1 className="text-4xl font-bold uppercase my-6">Users</h1>
            <Separator />
            <Accordion type="single" collapsible className="w-full mt-6">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Admins</AccordionTrigger>
                    <AccordionContent className="w-full">
                        <div className="flex ml-auto">
                            <Button className="ml-auto" onClick={() => { dispatch(openModal({ type: "newAdmin", })) }} >
                                <Plus size={24} /> New Admin User
                            </Button>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-2 py-4">
                            {
                                isLoading && <p>Loading...</p>
                            }
                            {
                                Array.isArray(admins) && admins.map((admin, idx) => (
                                    <div key={idx} className="flex justify-between items-center px-4 py-2 shadow-lg rounded-lg my-2 gap-4 w-full ">
                                        <div className="flex gap-4 items-center">
                                            <p className="text-lg font-bold">
                                                {admin.name}
                                            </p>
                                            <p className="text-sm">
                                                {admin.email}
                                            </p>
                                        </div>
                                        <div className="flex gap-4 items-center pr-4">
                                            <button className="cursor-pointer">
                                                Edit
                                            </button>
                                            <button className="cursor-pointer">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Customers</AccordionTrigger>
                    <AccordionContent>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}