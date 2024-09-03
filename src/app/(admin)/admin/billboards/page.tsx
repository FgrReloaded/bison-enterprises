"use client"
import { useQuery } from "@tanstack/react-query";
import { AddBillBoard } from "./_components/AddBillBoard";
import { getBillboards } from "@/actions/admin/billboards";
import BillBoard from "@/components/billboards/BillBoard";
import BillBoards from "@/components/billboards";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import ActionTooltip from "@/components/modals/ActionTooltip";
import { PenIcon, Trash } from "lucide-react";

export default function BillBoardPage() {
  const { data: billboards, isLoading } = useQuery({
    queryKey: ['billboards'],
    queryFn: () => getBillboards(),
    initialData: []
  })

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center w-full h-full">
        <h1 className="text-3xl font-bold">Billboards</h1>
        <p>Loading...</p>
      </div>
    )
  }


  return (
    <div className="flex flex-col justify-center w-full h-full gap-4">
      <h1 className="text-3xl font-bold">Billboards</h1>
      {
        billboards.length !==4 && <AddBillBoard />
      }
      {billboards.length === 0 && <div className="flex flex-col justify-center w-full h-full items-center mt-20"><p>No billboards found</p></div>}

      {
        billboards &&
        billboards.map((billboard) => {
          return (
            <div key={billboard.id} className="flex justify-between px-4 items-center py-2 shadow-lg rounded-lg my-2">
              <div className="w-32 h-32 relative">
                <CldImage key={billboard.id} src={billboard.image} fill style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "1rem" }} alt={billboard.title} />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-bold">
                  {billboard.title}
                </p>
                <p className="text-sm">
                  {billboard.tagline}
                </p>
              </div>
              <Link href={billboard.link} target="_blank" className=" border shadow px-4 py-2 rounded-lg">
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
  )
}