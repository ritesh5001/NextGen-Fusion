import { cityRoute } from "@/components/city-pages/routes"
import { australia } from "@/data/australia"

const route = cityRoute(australia)

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
