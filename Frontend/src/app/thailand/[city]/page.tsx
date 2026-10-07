import { cityRoute } from "@/components/city-pages/routes"
import { thailand } from "@/data/thailand"

const route = cityRoute(thailand)

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
