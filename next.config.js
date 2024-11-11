const createNextIntlPlugin = require("next-intl/plugin")

const withNextIntl = createNextIntlPlugin(
  // Specify a custom path here
  "./src/lib/i18n/index.ts",
)

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withNextIntl(nextConfig)
