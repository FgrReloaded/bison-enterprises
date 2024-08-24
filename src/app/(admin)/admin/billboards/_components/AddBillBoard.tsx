"use client"
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/slices/modalSlice";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const AddBillBoard = () => {
    const dispatch = useDispatch();

    return (
        <div className="flex ml-auto">

        <Button onClick={() => { dispatch(openModal({ type: "newBillboard", })) }}>
            <Plus size={24} /> Add BillBoard
        </Button>
        </div>
    )
}