import { fetchAllOrders } from "@/actions/admin/orders"
import OrdersTable from "./_components/OrdersTable";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function OrderPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['all-orders'],
        queryFn: fetchAllOrders,
    });

    return (
        <div className="flex flex-col px-2">
            <h1 className="text-4xl font-bold uppercase my-6">All Orders</h1>
            <div>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <OrdersTable />
                </HydrationBoundary>
            </div>
        </div>
    )
}