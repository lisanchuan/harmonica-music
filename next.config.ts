import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.xiaoeknow.com' },
      { protocol: 'http', hostname: '**.xiaoeknow.com' },
      { protocol: 'https', hostname: '**.myqcloud.com' },
      { protocol: 'http', hostname: '**.myqcloud.com' },
      { protocol: 'https', hostname: '**.mmbiz.qpic.cn' },
      { protocol: 'http', hostname: '**.mmbiz.qpic.cn' },
      { protocol: 'https', hostname: '**.qq.com' },
    ],
  },
};

export default nextConfig;