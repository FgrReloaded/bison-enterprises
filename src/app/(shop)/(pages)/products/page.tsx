"use client"
import { getProducts } from "@/actions/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";

export default function ProductsPage() {
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['shop-products'],
        queryFn: () => getProducts(),
        initialData: [],
    });

    if (isLoading) return <div>Loading...</div>;

    if (products.length === 0) return <div>No products found</div>;

    return (
        <>
            <h1 className="text-3xl font-semibold px-4 md:pr-4 md:pl-6 py-2">Products</h1>
            <Separator />
            <div className='px-4 py-6 flex mx-auto justify-center items-center gap-12 flex-wrap w-[90%]'>
                {
                    products.map((product, idx) => (
                        <ProductCard key={idx} product={product} />
                    ))
                }
            </div>
        </>
    )
}