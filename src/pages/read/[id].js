import { NextSeo } from 'next-seo';
import MiniCard from "@/components/Card/Mini"
import { useEffect, useState } from "react";
import MangaCard from "@/components/Card/MangaCard";
import Tippy from '@tippyjs/react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from 'moment/moment';
import ScrollToTopButton from '@/components/ScroolTopButton';
import { useRouter } from 'next/router'
import axios from 'axios';

export default function Home() {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(true);
    const [chapter, setChapter] = useState(null);

    useEffect(() => {
        if (!id) return;
        axios.get(`http://127.0.0.1:8000/api/bookly/chapter/${id}/`)
          .then(response => {
            setChapter(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
            setLoading(false);
          });
    }, [id]);

    let title = "Bookly";
    let content = null;

    if (loading) {
        title = "Loading...";
        content = (
            <SkeletonTheme baseColor="#202020" highlightColor="#232323">
                <div class="flex flex-col space-y-4">
                    <Skeleton height={40} />
                    <Skeleton height={20} count={5} />
                </div>
            </SkeletonTheme>
        );
    } else {
        if (chapter) {
            title = chapter.title;
            content = (
                <>
                    <h1 class="text-2xl font-bold mx-auto">{chapter.title}</h1>
                    <p class="text-justify text-2xl" dangerouslySetInnerHTML={{ __html: chapter.content }}></p>
                </>
            )
        } else {
            title = "Connection Error";
            content = (
                <div class="flex flex-col space-y-4">
                    <h1 class="text-2xl font-bold">Ops! Something went wrong</h1>
                </div>
            )
        }
    }

    return (
        <>
            <NextSeo title={title}/>
            <div class="flex flex-col space-y-8 mx-20">
                {content}
                {/* {loading ? (
                    <h1 class="text-2xl font-bold">Bookly</h1>
                ) : (
                    <>
                        <h1 class="text-2xl font-bold">{chapter.title}</h1>
                        <p class="text-justify" dangerouslySetInnerHTML={{ __html: chapter.content }}></p>
                    </>
                )} */}
            </div>
            <ScrollToTopButton />

        </>
    )
}