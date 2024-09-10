import { redirect } from "next/navigation";
import { getAdmin } from "./_actions/get-admin";
import StatsCard from "@/components/admin/cards/StatCard";
import LatestOrders from "@/components/admin/LatestOrders";

export default async function AdminPage() {
    const adminUser = await getAdmin();
    if (!adminUser) {
        redirect("/not-found");
    }
    return (
        <>
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <StatsCard />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                    <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                        <div>
                            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">Latest Orders</h6>
                            <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                            </p>
                        </div>
            
                    </div>
                    <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Order Id</p>
                                    </th>
                                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Amount</p>
                                    </th>
                                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Customer</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <LatestOrders />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}