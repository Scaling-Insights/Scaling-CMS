"use client";

import React from 'react';
import Icon from '@/app/components/misc/Icon';
import { Boxicons } from '@/enums/BoxIconsEnum';
import { useRouter } from "next/navigation";


interface SidebarElementProps{
    icon: Boxicons;
    label: string;
    page: string;
}

const SidebarElement: React.FC<SidebarElementProps> = (props) => {
    const router = useRouter()
    return (
        <>
            <li className="group">
                <a onClick={() => router.push(props.page)} className="flex items-center p-2 text-secondary dark:text-primary rounded-md hover:bg-primary hover:text-white hover:cursor-pointer">
                    <Icon name={props.icon} color="text-primary" />
                    <span className="flex-1 ms-3 whitespace-nowrap">{props.label}</span>
                </a>
            </li>
        </>
    );
};

export default SidebarElement;
