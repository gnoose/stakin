/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    api: process.env.API_URL || 'http://localhost:3005/api/v0',
  },
}
