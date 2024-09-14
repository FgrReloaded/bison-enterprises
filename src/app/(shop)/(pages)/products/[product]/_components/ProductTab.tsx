import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Review from "./Review"

interface ProductTabProps {
    description: string
}

const ProductTab = ({description}:ProductTabProps) => {
    return (
        <Tabs defaultValue="description">
            <div>
                <nav className="flex gap-4">
                    <TabsList className="bg-transparent">
                        <TabsTrigger value="description" className="data-[state=active]:border-b-1 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none" >
                            <span className="text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Description </span>
                        </TabsTrigger>
                        {/* <TabsTrigger value="reviews" className="data-[state=active]:border-b-1 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none">
                            <span className="inline-flex items-center text-sm font-medium text-gray-600">
                                Reviews
                            </span>
                        </TabsTrigger> */}
                    </TabsList>
                </nav>
            </div>

            <TabsContent value="description">
                <div className="mt-8 flow-root sm:mt-12">
                   {description}
                </div>
            </TabsContent>
            <TabsContent value="reviews">
                <Review />
            </TabsContent>
        </Tabs>
    )
}

export default ProductTab