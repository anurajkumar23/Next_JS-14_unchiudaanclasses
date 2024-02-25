export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/adminpower','/studymaterials']
      },
      sitemap: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sitemap.xml`,
    }
  }