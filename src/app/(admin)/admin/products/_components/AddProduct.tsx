"use client"
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/slices/modalSlice";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const AddProduct = () => {
    const dispatch = useDispatch();

    return (
        <Button onClick={() => { dispatch(openModal({ type: "productForm", })) }}>
            <Plus size={24} /> Add Product
        </Button>
    )
}