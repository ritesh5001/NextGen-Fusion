import { cityRoute } from "@/components/city-pages/routes"
import { india } from "@/data/india"

const route = cityRoute(india)

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
