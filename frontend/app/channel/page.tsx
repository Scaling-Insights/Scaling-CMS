"use client";
import { usePost } from "@/hooks/usePost";
import { useEffect, useState } from "react";
import Header from "@/app/components/header/Header";
import Spinner from "@/app/components/misc/Spinner";
import Sidebar from "@/app/components/sidebar/Sidebar";
import ContentItem from "@/app/components/channel/ContentItem";


// const content = [
//     { title: "titel die best wel lang is maar dat is oke want hij kapt hem mooi af", description: "beschrijving", tags: ["tag1", "tag2", "tag3"], createdAt: new Date(Date.UTC(2024, 8, 12)), publicationStatus: "public", thumbnailLink: "https://images.unsplash.com/photo-1543051932-6ef9fecfbc80?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     { title: "titel", description: "beschrijving", tags: ["tag1", "tag2", "tag3"], createdAt: new Date(Date.UTC(2024, 8, 12)), publicationStatus: "public", thumbnailLink: "https://images.unsplash.com/photo-1516690553959-71a414d6b9b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     { title: "titel", description: "beschrijving kan echt heel lang worden dit is natuurlijk super cool maar ik heb helemaal geen zn om zo veeeeeeeeeel te typen, dat is toch een drama.", tags: ["tag1"], createdAt: new Date(Date.now()), publicationStatus: "private", thumbnailLink: "https://images.unsplash.com/photo-1506792006437-256b665541e2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     { title: "titel", description: "", tags: ["tag1", "tag2"], createdAt: new Date(Date.UTC(2024, 8, 12)), publicationStatus: "public", thumbnailLink: "" },
//     { title: "", description: "beschrijving", tags: [], createdAt: new Date(Date.UTC(2024, 8, 12)), publicationStatus: "public", thumbnailLink: "" },
//     { title: "titel", description: "beschrijving", tags: ["tag1", "tag2", "tag3", "tag4"], createdAt: new Date(Date.now()), publicationStatus: "public", thumbnailLink: "" },
//     { title: "titel", description: "beschrijving", tags: ["tag1", "tag2", "tag3", "tag4"], createdAt: new Date(Date.now()), publicationStatus: "public", thumbnailLink: "" },
//     { title: "titel", description: "beschrijving", tags: ["tag1", "tag2", "tag3", "tag4"], createdAt: new Date(Date.UTC(2024, 8, 12)), publicationStatus: "public", thumbnailLink: "" },
//     { title: "titel", description: "beschrijving", tags: ["tag1", "tag2", "tag3", "tag4"], createdAt: new Date(Date.now()), publicationStatus: "public", thumbnailLink: "" },
// ];


export default function Channel() {
    const [isLoading, setIsLoading] = useState(true);
    const [usedContent, setUsedContent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [startItem, setStartItem] = useState(0);
    const [endItem, setEndItem] = useState(0);

    const { postData } = usePost();
    const ITEMS_PER_PAGE = Number(process.env.NEXT_PUBLIC_MY_CHANNEL_MAX_CONTENT_ITEMS);

    // Fetch content from the API
    // const getContent = async (rangeMin: number, rangeMax: number, page: number) => {
    //     setIsLoading(true);

    //     const getContentDTO = { rangeMin, rangeMax };

    //     const { response, data } = await postData(process.env.NEXT_PUBLIC_CONTENT_GET_URL, getContentDTO, false);

    //     if (response !== 201 || !data["contents"]?.contents) {
    //         console.error("Failed to fetch content:", data);
    //         setIsLoading(false);
    //         return;
    //     }

    //     const fetchedContent = data["contents"].contents || [];
    //     const totalItemsCount = data["rangeSize"] || 0;

    //     setTotalItems(totalItemsCount);
    //     setTotalPages(Math.ceil(totalItemsCount / ITEMS_PER_PAGE));

    //     updatePageContent(page, fetchedContent);
    //     setIsLoading(false);
    // };

    const getContent = () => {
        setIsLoading(true);

        const contents = [
            { title: "titel die best wel lang is maar dat is oke want hij kapt hem mooi af", description: "beschrijving", tags: ["tag1", "tag2", "tag3"], createdAt: new Date(Date.UTC(2024, 8, 12)), publicationStatus: "public", thumbnailLink: "https://images.unsplash.com/photo-1543051932-6ef9fecfbc80?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { title: "titel", description: "beschrijving", tags: ["tag1", "tag2", "tag3"], createdAt: new Date(Date.UTC(2024, 8, 12)), publicationStatus: "public", thumbnailLink: "https://images.unsplash.com/photo-1516690553959-71a414d6b9b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { title: "titel", description: "beschrijving kan echt heel lang worden dit is natuurlijk super cool maar ik heb helemaal geen zn om zo veeeeeeeeeel te typen, dat is toch een drama.", tags: ["tag1"], createdAt: new Date(Date.now()), publicationStatus: "private", thumbnailLink: "https://images.unsplash.com/photo-1506792006437-256b665541e2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { title: "titel", description: "", tags: ["tag1", "tag2"], createdAt: new Date(Date.UTC(2024, 8, 12)), publicationStatus: "public", thumbnailLink: "" },
            { title: "", description: "beschrijving", tags: [], createdAt: new Date(Date.UTC(2024, 8, 12)), publicationStatus: "public", thumbnailLink: "" },
            { title: "titel", description: "beschrijving", tags: ["tag1", "tag2", "tag3", "tag4"], createdAt: new Date(Date.now()), publicationStatus: "public", thumbnailLink: "" },
            { title: "titel", description: "beschrijving", tags: ["tag1", "tag2", "tag3", "tag4"], createdAt: new Date(Date.now()), publicationStatus: "public", thumbnailLink: "" },
            { title: "titel", description: "beschrijving", tags: ["tag1", "tag2", "tag3", "tag4"], createdAt: new Date(Date.UTC(2024, 8, 12)), publicationStatus: "public", thumbnailLink: "" },
            { title: "titel", description: "beschrijving", tags: ["tag1", "tag2", "tag3", "tag4"], createdAt: new Date(Date.now()), publicationStatus: "public", thumbnailLink: "" },
        ];

        const data = {
            contents: contents, 
            rangeSize: contents.length 
        }

        const fetchedContent = data["contents"] || [];
        const totalItemsCount = data["rangeSize"] || 0;

        setTimeout(() => {
            setTotalItems(totalItemsCount);
            setTotalPages(Math.ceil(totalItemsCount / ITEMS_PER_PAGE));

            updatePageContent(0, fetchedContent);
            setIsLoading(false);
        }, 30);
    }

    const updatePageContent = (page: number, fullContent: any[]) => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + fullContent.length;

        setStartItem(start + 1);
        setEndItem(end);
        setUsedContent(fullContent);
    };

    const handlePageChange = async (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;

        setCurrentPage(newPage);

        const rangeMin = (newPage - 1) * ITEMS_PER_PAGE;
        const rangeMax = Math.min(rangeMin + ITEMS_PER_PAGE, totalItems);

        // await getContent(rangeMin, rangeMax - 1, newPage);
    };

    useEffect(() => {
        const rangeMin = 0;
        const rangeMax = ITEMS_PER_PAGE - 1;
        // getContent(rangeMin, rangeMax, 1);
        getContent();
    }, []);

    return (
        <>
            <Sidebar />
            <Header />

            <div className="w-full mt-8 sm:ml-64 lg:ml-44 xl:ml-36 2xl:ml-32 sm:mt-20 sm:pr-2 pb-8">
                <div className="bg-secondary rounded-md shadow-md md:p-2">
                    {/* Header */}
                    <div className="hidden lg:grid grid-cols-12 mb-1 border-b-2 border-gray-300">
                        <div className="col-span-1 text-md text-primary p-1 px-2">Thumbnail</div>
                        <div className="col-span-2 text-md text-primary p-1 px-2">Titel</div>
                        <div className="col-span-5 text-md text-primary p-1 px-2">Beschrijving</div>
                        <div className="col-span-2 text-md text-primary p-1 px-2">Tags</div>
                        <div className="col-span-1 text-md text-primary p-1 px-2">Datum</div>
                        <div className="col-span-1 text-md text-primary p-1 px-2 text-right">Status</div>
                    </div>

                    {isLoading ? (
                        <div className="min-h-64 flex flex-col justify-center items-center">
                            <Spinner className="mt-2 mb-4" />
                        </div>
                    ) : usedContent?.length === 0 ? (
                        <p className="text-2xl text-center py-32">
                            Er is nog geen content beschikbaar
                        </p>
                    ) : (
                        usedContent.map((Item) => (
                            <ContentItem key={Item.id} {...Item} />
                        ))
                    )}

                    {/* Pagination */}
                    <nav className="flex flex-wrap items-center justify-between p-2 pt-4">
                        <span className="text-sm font-normal text-primary block w-full">
                            Items
                            <span className="font-semibold text-primary ml-1 mr-1">
                                {startItem}-{endItem}
                            </span>
                            van de
                            <span className="font-semibold text-primary ml-1">{totalItems}</span>
                        </span>

                        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 mt-2">
                            <li>
                                <div
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-primary border border-gray-300 rounded-s-lg ${currentPage === 1
                                        ? "cursor-default bg-gray-400 text-white"
                                        : "cursor-pointer bg-quaternary hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    Vorige
                                </div>
                            </li>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
                                <li key={i}>
                                    <div
                                        onClick={() => handlePageChange(i)}
                                        className={`flex items-center justify-center px-3 h-8 leading-tight border-gray-300 cursor-pointer ${i === currentPage
                                            ? "bg-primary text-white"
                                            : "bg-quaternary border text-primary"
                                            }`}
                                    >
                                        {i}
                                    </div>
                                </li>
                            ))}

                            <li>
                                <div
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={`flex items-center justify-center px-3 h-8 leading-tight text-primary border border-gray-300 rounded-e-lg ${currentPage === totalPages
                                        ? "cursor-default bg-gray-400 text-white"
                                        : "cursor-pointer bg-quaternary hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    Volgende
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
