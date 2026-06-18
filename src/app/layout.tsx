import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "音乐曲谱馆",
  description: "口琴、尤克里里曲谱与示范演奏",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
