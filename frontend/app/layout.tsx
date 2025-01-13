import "./globals.css";
import type { Metadata } from "next";
import 'boxicons/css/boxicons.min.css';
import Sidebar from "@/app/components/sidebar/Sidebar";
import { headers } from "next/headers";


export const metadata: Metadata = {
	title: process.env.NEXT_PUBLIC_APP_NAME || "Backup title",
	description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Backup description",
	keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS || "Backup keywords",
	robots: {
		index: false,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="nl">
			<head>
				<link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
			</head>
			<body className="h-full">
				<main>
					<div className="h-screen ml-0 mt-8 p-2 sm:mt-0">
						<div className="flex justify-center h-full">
							<div className="w-full lg:w-10/12">
								<div className="page-content">{children}</div>
							</div>
						</div>
					</div>
				</main>

				<script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js" defer></script>
			</body>
		</html>
	);
}
