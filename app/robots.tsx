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
    sitemap:
      "https://kurume-night-guide--kurume-night-guide.us-east4.hosted.app/sitemap.xml",
  };
}
