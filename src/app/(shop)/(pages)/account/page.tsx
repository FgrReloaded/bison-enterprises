import AccountForm from "@/components/forms/AccountForm";
import { updateProfile } from "@/lib/manage-account";
import UserData from "./_components/UserData";



export default function AccountPage() {

    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-24">
                    <div className="flex items-center lg:mb-0 mb-10">
                        <div className="">
                            <h4 className="text-red-600 text-base font-medium leading-6 mb-4 lg:text-left text-center">Edit Info</h4>
                            <h2 className="text-gray-900 font-manrope text-4xl font-semibold leading-10 mb-9 lg:text-left text-center">Update Account Details</h2>
                            <AccountForm updateAccount={updateProfile} />
                        </div>
                    </div>
                    <div className="lg:max-w-xl w-full h-[600px] flex items-center justify-center  bg-cover bg-no-repeat bg-[url('https://pagedone.io/asset/uploads/1696245837.png')] ">
                        <UserData />
                    </div>
                </div>
            </div>
        </section >
    )
}