import { Separator } from "@/components/ui/separator";
import ProductsTable from "./_components/Products";
import { AddProduct } from "./_components/AddProduct";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getProducts } from "@/actions/admin/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddVariants } from "./_components/AddVariants";
import VariantsTable from "./_components/VariantsTable";


export default async function AdminProductPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });


    return (
        <Tabs defaultValue="Variants">
            <div>
                <nav className="flex gap-4">
                    <TabsList className="bg-transparent">
                        <TabsTrigger value="Products" className="data-[state=active]:border-b-1 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none" >
                            <span className="text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Products </span>
                        </TabsTrigger>
                        <TabsTrigger value="Categories" className="data-[state=active]:border-b-1 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none">
                            <span className="inline-flex items-center text-sm font-medium text-gray-600">
                                Categories
                            </span>
                        </TabsTrigger>
                        <TabsTrigger value="Variants" className="data-[state=active]:border-b-1 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none">
                            <span className="inline-flex items-center text-sm font-medium text-gray-600">
                                Variants
                            </span>
                        </TabsTrigger>
                    </TabsList>
                </nav>
            </div>
            <TabsContent value="Products">
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
            </TabsContent>
            <TabsContent value="Variants">
                <div className="flex flex-col">
                    <div className="ml-auto">
                        <AddVariants />
                    </div>
                    <Separator className="my-4" />
                    <div className="flex flex-col px-2">
                        <h1 className="text-4xl font-bold uppercase my-6">All Variants</h1>
                        <VariantsTable />
                    </div>

                </div>
            </TabsContent>
        </Tabs>
    )
}