import type { Metadata } from "next"
import { ArrowLeft, ExternalLink, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import { apiService } from "@/lib/api"
import { normalizeImagePath } from "@/lib/utils"
import Link from "next/link"
import { buildMetadata } from "@/lib/seo"

export async function generateStaticParams() {
  try {
    const items = await apiService.getShowcaseItems()
    return items.map((item) => ({ id: String(item.id) }))
  } catch {
    return []
  }
}

export const dynamicParams = false

function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
}

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const item = await apiService.getShowcaseItem(Number(id)).catch(() => null)
  if (!item) return buildMetadata({
    title: "Showcase",
    description: "A project from the NextGen Fusion showcase.",
    path: `/showcase/${id}`,
  })

  return buildMetadata({
    title: `${item.title} — Showcase`,
    description: `${item.title} — a website designed and developed by NextGen Fusion. See the live build and what went into it.`,
    path: `/showcase/${item.id}`,
    image: item.image ? normalizeImagePath(item.image) : undefined,
  })
}

export default async function ShowcaseDetailPage(props: Props) {
  const { params } = props
  const { id } = await params
  const idNum = Number(id)
  const showcaseItem = await apiService.getShowcaseItem(idNum)

	if (!showcaseItem) {
		return (
			<div className="min-h-screen">
				<div className="flex items-center justify-center min-h-[60vh]">
					<div className="text-center">
						<h3 className="text-xl font-semibold text-ink mb-2">Error</h3>
						<p className="text-ink-soft mb-4">Showcase item not found</p>
						<Link href="/showcase/" className="bg-ink text-white px-6 py-3 rounded-full font-medium hover:bg-ink inline-block">Back to Showcase</Link>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen">
			<main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<div className="mb-8">
						<Link href="/showcase/" className="flex items-center gap-2 text-ink-soft hover:text-ink transition-colors duration-200">
							<ArrowLeft className="w-5 h-5" />
							Back to Showcase
						</Link>
					</div>

					<div className="grid lg:grid-cols-2 gap-12 items-start">
						<div className="space-y-6">
							<div className="relative overflow-hidden rounded-[28px] shadow-lg">
								<Image
									src={normalizeImagePath(showcaseItem.image)}
									alt={showcaseItem.title}
									width={600}
									height={400}
									className="w-full h-auto object-cover"
									unoptimized={normalizeImagePath(showcaseItem.image).startsWith('http')}
								/>
								<div className="absolute inset-0 bg-ink/0 hover:bg-ink/20 transition-all duration-300 flex items-center justify-center">
									<a
										href={showcaseItem.url}
										target="_blank"
										rel="noopener noreferrer"
										className="glass opacity-0 hover:opacity-100 text-ink px-8 py-4 rounded-full font-medium flex items-center gap-3 translate-y-4 hover:translate-y-0 transition-all duration-300"
									>
										<span>View Project</span>
										<ExternalLink className="w-5 h-5" />
									</a>
								</div>
							</div>
						</div>

						<div className="space-y-8">
							<div className="space-y-4">
								<h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-ink leading-tight tracking-tight">{showcaseItem.title}</h1>
								<p className="text-ink-soft text-lg leading-relaxed">
									This project showcases our expertise in creating innovative digital solutions. 
									We combine cutting-edge technology with creative design to deliver exceptional 
									user experiences that drive results.
								</p>
							</div>

							<div className="space-y-6">
								<h3 className="text-xl font-semibold text-ink">Project Details</h3>
								<div className="space-y-4">
									<div className="glass flex items-center gap-3 p-4 rounded-lg">
										<Calendar className="w-5 h-5 text-brand" />
										<div>
											<p className="text-sm text-ink-mute">Created</p>
											<p className="font-medium text-ink">{formatDate(showcaseItem.created_at)}</p>
										</div>
									</div>
									<div className="glass flex items-center gap-3 p-4 rounded-lg">
										<Clock className="w-5 h-5 text-brand" />
										<div>
											<p className="text-sm text-ink-mute">Updated</p>
											<p className="font-medium text-ink">{formatDate(showcaseItem.updated_at)}</p>
										</div>
									</div>
									<div className="glass flex items-center gap-3 p-4 rounded-lg">
										<div className="w-5 h-5 bg-brand rounded-full flex items-center justify-center">
											<span className="text-white text-xs font-bold">#</span>
										</div>
										<div>
											<p className="text-sm text-ink-mute">Display Order</p>
											<p className="font-medium text-ink">{showcaseItem.display_order}</p>
										</div>
									</div>
									<div className="glass flex items-center gap-3 p-4 rounded-lg">
										<div className={`${showcaseItem.is_active ? 'bg-green-500' : 'bg-red-500'} w-3 h-3 rounded-full`}></div>
										<div>
											<p className="text-sm text-ink-mute">Status</p>
											<p className="font-medium text-ink">{showcaseItem.is_active ? 'Active' : 'Inactive'}</p>
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<a
									href={showcaseItem.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex-1 bg-brand text-white px-8 py-4 rounded-full font-medium hover:bg-brand-deep transition-colors duration-200 flex items-center justify-center gap-3"
								>
									<span>View Live Project</span>
									<ExternalLink className="w-5 h-5" />
								</a>
								<Link
									href="/showcase/"
									className="flex-1 bg-white/70 text-ink px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200 text-center"
								>
									Back to Showcase
								</Link>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}
