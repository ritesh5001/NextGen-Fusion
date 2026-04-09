import '../src/index.css';
import '../src/App.css';

export const metadata = {
  title: 'NextGen Fusion | Website Development, AI Solutions & Digital Services',
  description:
    'NextGen Fusion is a leading web development and AI solutions company offering website development, e-commerce solutions, custom web apps, and AI automation services to grow your business.',
  keywords: [
    'website development company',
    'ecommerce website development',
    'AI development company',
    'chatbot development services',
    'web application development',
    'full stack development services',
    'SEO optimization services',
    'digital solutions company',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body theme="">{children}</body>
    </html>
  );
}