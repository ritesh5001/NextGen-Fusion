

const serviceIcon = `<svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.2" d="M45.9998 10H31.9998L19.7271 26L31.9998 56L59.9998 26L45.9998 10Z" fill="currentColor"></path>
    <path d="M18 10H46L60 26L32 56L4 26L18 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M44.2726 26L31.9998 56L19.7271 26L31.9998 10L44.2726 26Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M4 26H60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>`;

const items = [
    {
        title: "Development Services",
        keywords: "Website Development Company, Web Development Services, Custom Web Development",
        services: [
            "Website Development - Professional, fast, and SEO-friendly business websites",
            "Custom Web Application Development - Scalable web apps tailored to your business needs",
            "E-commerce Development - High-converting online stores with secure payment integration",
            "Landing Page Development - Conversion-focused landing pages for ads and lead generation",
            "SaaS Platform Development - Build scalable SaaS products with modern tech stack",
            "API Development and Integration - Secure and scalable REST API solutions",
        ],
    },
    {
        title: "Mobile App Services",
        keywords: "Mobile App Development Company, Android App Development, React Native Apps",
        services: [
            "Android App Development - High-performance Android apps for startups and businesses",
            "Cross-Platform App Development (React Native) - Build apps for Android and iOS faster",
            "Admin Panel and Dashboard Development - Powerful backend dashboards for business control",
        ],
    },
    {
        title: "Design Services",
        keywords: "UI/UX Design Services, Website Design Company, App Design",
        services: [
            "UI/UX Design - User-centered designs that improve engagement and conversions",
            "Website Design - Modern, responsive, and visually appealing websites",
            "Mobile App Design - Clean and intuitive mobile app interfaces",
            "Dashboard Design - Data-driven dashboard UI for better decision making",
            "Logo and Brand Identity Design - Professional branding for strong business presence",
        ],
    },
    {
        title: "AI and Automation Services",
        keywords: "AI Development Company, AI Chatbot Development, Business Automation",
        services: [
            "AI Chatbot Development (Website + WhatsApp) - Automate customer interaction and lead capture",
            "AI Customer Support Systems - 24/7 automated support with AI",
            "AI Telecalling Systems - Automated calling solutions for sales and support",
            "Lead Generation Automation - AI-powered lead capture and nurturing systems",
            "AI Recommendation Systems - Personalized user experience using AI",
            "Workflow Automation - Automate repetitive business processes",
        ],
    },
    {
        title: "Marketing and Growth Services",
        keywords: "Digital Marketing Agency, SEO Services, Google Ads Agency",
        services: [
            "Search Engine Optimization (SEO) - Rank higher on Google and increase organic traffic",
            "Google Ads Management - High ROI paid campaigns for lead generation",
            "Social Media Marketing - Grow your brand on Instagram, Facebook and more",
            "Content Marketing - SEO-driven content strategy for long-term growth",
            "Funnel and Conversion Optimization - Improve conversion rates and sales",
        ],
    },
    {
        title: "Support and Maintenance",
        keywords: "Website Maintenance Services, Website Support, Performance Optimization",
        services: [
            "Website Maintenance - Regular updates and smooth performance",
            "Bug Fixing and Updates - Quick issue resolution and feature improvements",
            "Performance Optimization - Speed and performance enhancement for better UX",
            "Security and Backup Management - Protect your website from threats",
        ],
    },
    {
        title: "Custom Software Solutions",
        keywords: "Custom Software Development, CRM Development Company, ERP Solutions",
        services: [
            "CRM Development - Manage customers and sales efficiently",
            "ERP Systems - Complete business management solutions",
            "Business Automation Tools - Automate workflows and operations",
            "Custom Admin Dashboards - Tailored dashboards for data and control",
        ],
    },
    {
        title: "Integration Services",
        keywords: "API Integration Services, Payment Integration, WhatsApp API",
        services: [
            "Payment Gateway Integration - Razorpay, Stripe and secure payment setup",
            "WhatsApp API Integration - Automate communication via WhatsApp",
            "Email and SMS Integration - Marketing and notification systems",
            "Third-party API Integration - Seamless connection with external tools",
        ],
    },
    {
        title: "Conversion and Sales Optimization",
        keywords: "Conversion Rate Optimization, Sales Funnel, Landing Page Optimization",
        services: [
            "Landing Page Optimization - Improve lead generation performance",
            "Sales Funnel Development - Structured funnels for higher conversions",
            "A/B Testing - Data-driven optimization for better results",
        ],
    },
    {
        title: "Premium and Advanced Services",
        keywords: "AI SaaS Development, Cloud Solutions, DevOps Services",
        services: [
            "AI SaaS Product Development - Build scalable AI-based products",
            "Data Analytics Dashboards - Real-time insights for business growth",
            "Business Intelligence Solutions - Data-driven decision-making systems",
            "Cloud Deployment and DevOps (CI/CD, Docker, Kubernetes) - Scalable and automated infrastructure",
        ],
    },
];

function Card() {
    return (
        <div className="card-container flex sm:flex-col gap-10 mt-20 overflow-x-auto sm:overflow-visible pb-2">
            {items.map((item) => {
                return (
                    <div
                        key={item.title}
                        className="card min-w-[40vh] sm:w-[30vw] sm:flex items-start gap-6 border-[1px] border-[--black] py-8 px-8"
                    >
                        <div
                            className="rightdata w-[10vh] h-[10vh] sm:w-[28vh] sm:h-[10vh]"
                            dangerouslySetInnerHTML={{ __html: serviceIcon }}
                        />
                        <div className="font-[Sansita] leftdata">
                            <h1 className="text-[3vh] font-bold sm:text-[2.8vh] sm:font-bold mb-2">{item.title}</h1>
                            <p className="text-[1.9vh] sm:text-[1.8vh] font-semibold leading-[2.7vh] mb-3">
                                Keywords: {item.keywords}
                            </p>
                            <ul className="space-y-2">
                                {item.services.map((service) => {
                                    return (
                                        <li key={`${item.title}-${service}`} className="text-[2.1vh] sm:text-[1.95vh] font-medium leading-[3vh]">
                                            {service}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Card;


