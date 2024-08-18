import { Separator } from "@/components/ui/separator";
import ProductsTable from "./_components/Products";
import { AddProduct } from "./_components/AddProduct";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getProducts } from "@/actions/admin/product";

export default async function AdminProductPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });


    return (
        <div className="flex flex-col">
            <div className="ml-auto">
                <AddProduct />
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col px-2">
                <h1 className="text-4xl font-bold uppercase my-6">All Products</h1>
                <div>
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <ProductsTable />
                    </HydrationBoundary>
                </div>
            </div>

        </div>
    )
}