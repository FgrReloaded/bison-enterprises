"use client"
import BillBoards from "@/components/billboards";
import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react"


export default function Home() {

    return (
        <>
            <BillBoards styleType="styleOne" allowedChildren={4} />
        </>
    );
}
