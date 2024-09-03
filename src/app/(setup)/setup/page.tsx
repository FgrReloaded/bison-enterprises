import AdminForm from "@/components/forms/AdminForm";
import { adminExists } from "@/lib/check-if-admin";
import { redirect } from "next/navigation";

export default async function SetupPage() {
    const isAdminExists = await adminExists();
    if(isAdminExists){
        redirect("/");
    }

    return (
        <div>
            <h1 className="text-center text-2xl p-4">Create a Admin User</h1>
            <AdminForm  />
        </div>
    );
}