import { serviceRoute } from "@/components/city-pages/routes"
import { oman } from "@/data/oman"

const route = serviceRoute(oman)

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
