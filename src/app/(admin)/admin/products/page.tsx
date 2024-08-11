"use client"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import ProductsTable from "./_components/Products";
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/slices/modalSlice";

export default function AdminProductPage() {
    const dispatch = useDispatch();
    
    return (
        <div className="flex flex-col">
            <div className="ml-auto">
                <Button onClick={()=>{dispatch(openModal("productForm"))}}>
                    <Plus size={24} /> Add Product
                </Button>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col px-2">
                <h1 className="text-4xl font-bold uppercase my-6">All Products</h1>
                <div>
                    <ProductsTable />
                </div>
            </div>

        </div>
    )
}