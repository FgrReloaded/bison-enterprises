"use client"
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/slices/modalSlice";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const AddVariants = () => {
    const dispatch = useDispatch();

    

    return (
        <Button onClick={() => { dispatch(openModal({ type: "variantModal", })) }}>
            <Plus size={24} /> Add Variant
        </Button>
    )
}