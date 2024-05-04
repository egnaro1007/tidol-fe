import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from "react";

import BigCard from '@/components/Card/BigCard';



import { Swiper, SwiperSlide } from "swiper/react";
import MangaCard from "@/components/Card/MangaCard";
import Link from "next/link";
import SlideCard from '@/components/Card/SlideCard';



export default function Home() {
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState("recent");

    const [recentList, setRecentList] = useState([]);
    const [followList, setFollowList] = useState([]);

    const handleRecentListAPI = async () => {
        setLoading(true);

        const res = await fetch("http://127.0.0.1:8000/api/bookly/history/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("access_token")}`,
            }
        });

        if (res.status === 200) {
            setRecentList(await res.json());
        }

        setLoading(false);
    };
    const handleFollowListAPI = () => {};




    let title = "Library";
    let content = null;

    const changeMenu = (menu) => {
        switch(menu) {
            case "recent":
                setMenu(menu);
                handleRecentListAPI();
                break;

            case "follow":
                setMenu(menu);
                handleFollowListAPI();
                break;

            default:
                setMenu("error");
                break;
        }
    };


    if (loading) {
        title = "Loading...";
    } else {
        title = "Library";

        switch(menu) {
            case "recent":
                content = (
                    <>
                        <div className='mt-8 lg:ml-0 -ml-4'>
                            <div id="title"><h1 class="text-2xl font-semibold">Recent Reading</h1></div>
                        </div>
                        <div className='mt-4 w-full'>
                           <div id="body" className="flex flex-col p-4">
                                {loading ? Array.from(Array(18).keys()).map((d) => <SkeletonComponent key={d} />) : recentList && recentList.map(item => <BookComponent key={item.id} history={item} />)}
                            </div>
                        </div>
                    </>
                );
                break;

            case "follow":
                content = (
                    <>
                        <div className='mt-8 lg:ml-0 -ml-4'>
                            <div id="title"><h1 class="text-2xl font-semibold">Follow</h1></div>
                        </div>
                    </>
                );
                break;

            default:
                content = (
                    <>
                        <div className='mt-8 lg:ml-0 -ml-4'>
                            <div id="title"><h1 class="text-2xl font-semibold">Error</h1></div>
                        </div>
                    </>
                );
                break;
        }
    }

    return (
    <>
        <NextSeo title={title} />
        <div className='lg:px-24 mx-auto justify-center lg:mt-8 pt-10'>
            <div className='body mt-4 flex flew-row space-x-4'>
                <div className='hidden lg:block w-60 h-[64rem] overflow-auto rounded-lg bg-zinc-700/20 border border-zinc-700/10'>
                    <div className="flex flex-col mt-1 overflow-auto">
                        <div onClick={() => changeMenu("recent")} className={`bg-zinc-700/30 justify-between button-animate p-2 px-3 text-sm flex cursor-pointer mt-2 rounded-sm hover:bg-zinc-700/20`}>
                            <p className="text-center">Recent Reading</p>
                            <p className="text-center text-sm">.</p>
                        </div>
                        <div onClick={() => changeMenu("follow")} className={`bg-zinc-700/10 justify-between button-animate p-2 px-3 text-sm flex cursor-pointer mt-2 rounded-sm hover:bg-zinc-700/20`}>
                            <p className="text-center">Follow</p>
                            <p className="text-center text-sm">.</p>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    {content}
                </div>
            </div>
        </div>
    </>
  )
}

function BookComponent({ history }) {
    let date = new Date(history.timestamp);
    return (
        <BigCard
            book_title={history.book_title}
            description={history.book_description}
            chunk1={`Tác giả: ${history.author_name}`}
            chunk2={`Chương ${history.chapter_number}: ${history.chapter_title}`}
            chunk3={`${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)} - ${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`}
            cover={`http://127.0.0.1:8000${history.book_cover}`}
        />
    );
}
