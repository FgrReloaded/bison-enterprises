"use client"
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/slices/modalSlice";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const AddCategory = () => {
    const dispatch = useDispatch();

    return (
        <Button onClick={() => { dispatch(openModal({ type: "categoryForm", })) }}>
            <Plus size={24} /> Add Category
        </Button>
    )
}