/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_GRAPHQL_URL: process.env.NEXT_GRAPHQL_URL,
    NEXT_NITRO_CLIENT_URL: process.env.NEXT_NITRO_CLIENT_URL,
    NEXT_DISCORD_REDIRECT_URL: process.env.NEXT_DISCORD_REDIRECT_URL,
  }
}

module.exports = nextConfig
