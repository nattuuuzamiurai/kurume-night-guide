import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // 管理画面や検索パラメータ系（将来）を避ける
        disallow: ["/admin", "/search"],
      },
    ],
    sitemap: "https://YOUR_DOMAIN/sitemap.xml",
  };
}
