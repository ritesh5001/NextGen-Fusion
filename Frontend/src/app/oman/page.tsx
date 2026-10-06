import { hubRoute } from "@/components/city-pages/routes"
import { oman } from "@/data/oman"

const route = hubRoute(oman)

export const metadata = route.metadata
export default route.Page
