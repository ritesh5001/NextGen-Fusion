import { cityRoute } from "@/components/city-pages/routes"
import { oman } from "@/data/oman"

const route = cityRoute(oman)

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
