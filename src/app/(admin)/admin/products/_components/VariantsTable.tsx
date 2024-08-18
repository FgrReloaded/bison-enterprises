import { getVariants } from "@/actions/admin/variant"
import VariantItem from "./VariantItem";
import { Variant } from "@prisma/client";
import { VariantTypeWithVariant } from "@/lib/types";


const VariantsTable = async () => {
    const variants = await getVariants();
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Variants
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        variants?.map((variant: VariantTypeWithVariant, index: number) => (
                            <VariantItem key={index} variant={variant} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default VariantsTable