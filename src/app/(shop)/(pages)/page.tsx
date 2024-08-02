"use client"

import BillBoards from "@/components/billboards";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/manage-account";
import { setUserProfile } from "@/lib/slices/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProfile = async () => {
            const profile = await getProfile();
            if(!profile) return;
            dispatch(setUserProfile(profile))
        }

        fetchProfile()
    }, [dispatch])

    return (
        <>
            <BillBoards styleType="styleOne" allowedChildren={4} />
        </>
    );
}
