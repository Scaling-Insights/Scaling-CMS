import React from 'react';
import Image from 'next/image';
import Icon from '@/app/components/misc/Icon';
import SidebarElement from '@/app/components/sidebar/SidebarElement';
import { Boxicons } from '@/enums/BoxIconsEnum';
import ThemeToggle from '@/app/components/sidebar/ThemeToggle';


const Sidebar: React.FC = () => {
	return (
		<>
			{/* Sidebar Toggle Button (Visible on smaller screens) */}
			<button
				title="sidebar button"
				data-drawer-target="default-sidebar"
				data-drawer-toggle="default-sidebar"
				type="button"
				className="fixed top-2 left-0 items-center p-2 ms-1 text-sm rounded-md sm:hidden text-gray-800 dark:text-gray-100 z-30"
			>
				<Icon name="bx-menu" customClass="3em" color="text-primary" />
			</button>

			<aside
				aria-hidden="true"
				id="default-sidebar"
				className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0 shadow-md bg-secondary"
			>
				<div className="h-full px-3 py-4 overflow-y-auto">
					<ul className="space-y-2 font-medium">
						<Image src="/images/KubeLogo.enc" alt="Kube Logo" width={230} height={230} className="rounded-md" priority={true}/>

						<SidebarElement icon={Boxicons.Dashboard} label="Home - devOnly" page="/" />
						<SidebarElement icon={Boxicons.Dashboard} label="Mijn kanaal" page="/channel" />
						<SidebarElement icon={Boxicons.Upload} label="Content aanmaken" page="/channel/create" />
					</ul>
				</div>
				<div className="absolute bottom-3 left-3">
					<ThemeToggle />
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
