import { serviceRoute } from "@/components/city-pages/routes"
import { thailand } from "@/data/thailand"

const route = serviceRoute(thailand)

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
