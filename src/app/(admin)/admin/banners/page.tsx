"use client"
import { getBanners } from "@/actions/admin/banner";
import ActionTooltip from "@/components/modals/ActionTooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { openModal } from "@/lib/slices/modalSlice";
import { useQuery } from "@tanstack/react-query";
import { PenIcon, Plus, Trash } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function BannersPage() {
    const dispatch = useDispatch();
    const { data: banners, isLoading } = useQuery({
        queryKey: ['banners'],
        queryFn: () => getBanners(),
        initialData: []
    })

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center w-full h-full">
                <h1 className="text-3xl font-bold">Banners</h1>
                <p>Loading...</p>
            </div>
        )
    }


    return (
        <div className="flex flex-col px-2">
            <h1 className="text-4xl font-bold uppercase my-6">Banners</h1>
            <Separator />
            <div className="flex ml-auto mt-4">
                <Button onClick={() => { dispatch(openModal({ type: "newBanner" })) }} className="ml-auto" >
                    <Plus size={24} /> Add Banner
                </Button>
            </div>
            {banners.length === 0 && <div className="flex flex-col justify-center w-full h-full items-center mt-20"><p>No banners found</p></div>}

            {
                banners &&
                banners.map((banner: any) => {
                    return (
                        <div key={banner.id} className="flex justify-between md:flex-row flex-col md:gap-0 gap-4 text-center px-4 items-center py-2 shadow-lg rounded-lg my-2">
                            <div className="md:w-32 md:h-32 w-64 h-64 relative">
                                <CldImage key={banner.id} src={banner.image} fill style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "1rem" }} alt={banner.title} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-lg font-bold">
                                    {banner.title}
                                </p>
                                <p className="text-sm">
                                    {banner.tagline}
                                </p>
                            </div>
                            <Link href={banner.link} target="_blank" className=" border shadow px-4 py-2 rounded-lg">
                                Go to Product
                            </Link>
                            <div className="flex gap-4 items-center pr-4">
                                <ActionTooltip label="Edit" side="top" align="center">
                                    <PenIcon size={20} className="cursor-pointer" />
                                </ActionTooltip>
                                <ActionTooltip label="Delete" side="top" align="center">
                                    <Trash size={20} className="cursor-pointer" />
                                </ActionTooltip>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}