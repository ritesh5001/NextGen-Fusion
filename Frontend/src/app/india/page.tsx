import { hubRoute } from "@/components/city-pages/routes"
import { india } from "@/data/india"

const route = hubRoute(india)

export const metadata = route.metadata
export default route.Page
