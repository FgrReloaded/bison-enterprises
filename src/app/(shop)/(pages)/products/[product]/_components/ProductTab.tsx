import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Review from "./Review"

const ProductTab = () => {
    return (
        <Tabs defaultValue="description">
            <div>
                <nav className="flex gap-4">
                    <TabsList className="bg-transparent">
                        <TabsTrigger value="description" className="data-[state=active]:border-b-1 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none" >
                            <span className="text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Description </span>
                        </TabsTrigger>
                        <TabsTrigger value="reviews" className="data-[state=active]:border-b-1 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none">
                            <span className="inline-flex items-center text-sm font-medium text-gray-600">
                                Reviews
                            </span>
                        </TabsTrigger>
                    </TabsList>
                </nav>
            </div>

            <TabsContent value="description">
                <div className="mt-8 flow-root sm:mt-12">
                    <h1 className="text-3xl font-bold">Delivered To Your Door</h1>
                    <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia accusantium nesciunt fuga.</p>
                    <h1 className="mt-8 text-3xl font-bold">From the Fine Farms of Brazil</h1>
                    <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio numquam enim facere.</p>
                    <p className="mt-4">Amet consectetur adipisicing elit. Optio numquam enim facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore rerum nostrum eius facere, ad neque.</p>
                </div>
            </TabsContent>
            <TabsContent value="reviews">
                <Review />
            </TabsContent>
        </Tabs>
    )
}

export default ProductTab