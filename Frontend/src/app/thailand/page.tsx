import { hubRoute } from "@/components/city-pages/routes"
import { thailand } from "@/data/thailand"

const route = hubRoute(thailand)

export const metadata = route.metadata
export default route.Page
