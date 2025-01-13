/** @type {import('next').NextConfig} */
module.exports = {
	images: {
		domains: ["images.unsplash.com"],
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "http",
				hostname: "127.0.0.1",
				port: "9000",
				pathname: "**",
			},
		],
	},
	reactStrictMode: false,
	output: "standalone",
	experimental: {
	}
};
