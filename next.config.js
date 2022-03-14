const nextTranslate = require("next-translate");

/** @type {import('next').NextConfig} */
module.exports = nextTranslate({
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
});
