'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/app/components/misc/Button';
import { ButtonStyle, ButtonType } from '@/enums/ButtonEnum';
import { destroyJWTToken } from '@/services/AuthService';


const Header: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const pathname = usePathname();

    const routeTitles: { [key: string]: string } = {
        '/': 'Login',
        '/channel': 'Mijn kanaal',
        '/channel/create': 'Content aanmaken',
    };
    const router = useRouter()
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTitle(routeTitles[pathname] || 'Page Not Found');
        }
    }, [pathname]);

    return (
        <>
            <header className="fixed top-0 left-0 w-full h-16 shadow-md flex items-center bg-secondary z-20">
                <h5 className="pl-0 text-center absolute w-full md:pl-72 md:text-left md:fixed text-primary text-2xl">{title}</h5>

                {pathname !== '/' && (
                    <Button
                        type={ButtonType.Button}
                        id="Log uit"
                        value="Log uit"
                        style={ButtonStyle.Primary}
                        onClick={() => {
                            destroyJWTToken();
                            router.push('/');
                        }}
                        customClass="fixed right-5 mt-2"
                    />
                )}
            </header>
        </>
    );
};

export default Header;