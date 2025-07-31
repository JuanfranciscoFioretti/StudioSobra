import type { NextConfig } from 'next';
import { i18n } from './next-i18next.config';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['images.pexels.com'],
  },
};

export default nextConfig;