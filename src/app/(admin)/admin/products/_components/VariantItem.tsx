import { VariantTypeWithVariant } from '@/lib/types'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ActionTooltip from '@/components/modals/ActionTooltip'
import { Pencil, Trash } from 'lucide-react'

const VariantItem = ({ variant }: { variant: VariantTypeWithVariant }) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <span className='text-black text-lg uppercase'>{variant.name}</span>
            </td>

            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white flex ">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a variant" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Variants</SelectLabel>
                            {
                                variant.variants.map((v: any, index: number) => (
                                    <SelectItem key={index}  value={v.name.toLowerCase()}>{v.name}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>        </td>
            <td className="px-6 py-4">
                <div className='flex gap-4'>
                    <ActionTooltip label="Edit" align='center' side='top' >
                        <span className='cursor-pointer hover:text-red-500 transition-all'><Pencil size={24} /></span>
                    </ActionTooltip>
                    <ActionTooltip label="Remove" align='center' side='top' >
                        <span className='cursor-pointer hover:text-red-500 transition-all'><Trash size={24} /></span>
                    </ActionTooltip>
                </div>
            </td>
        </tr>

    )
}

export default VariantItem