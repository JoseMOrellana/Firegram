import React, { useState, useRef, useEffect } from "react";

import { useInfiniteScroll } from "../../context/InfiniteScrollContext";
import handleObserver from "../../helpers/infiniteScroll";
import styles from "./Explore.module.css";
import ExploreGrid from "./ExploreGrid/ExploreGrid";
import NoMoreLoad from "../../components/NoMoreLoad/NoMoreLoad";
import Spinner from "../../components/Spinner/Spinner";

export default function Explore() {
    const [grids, setGrids] = useState([]);
    const { fetchPosts, loading, done } = useInfiniteScroll();
    const loader = useRef(null);
    const btn = useRef(null);

    const updateGrids = async () => {
        const posts = await fetchPosts();
        console.log(posts);
        setGrids(grids.concat([<ExploreGrid posts={posts} />]));
    };
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0,
        };
        // initialize IntersectionObserver
        // and attaching to Load More div
        const observer = new IntersectionObserver(handleObserver(btn), options);
        if (loader.current) {
            observer.observe(loader.current);
        }
        updateGrids();
    }, []);
    return (
        <div className="content" data-testid="explore-page">
            <ul className={styles.Container}>{grids}</ul>
            {loading && <Spinner />}
            {!done && (
                <button
                    onClick={() => {
                        updateGrids();
                    }}
                    ref={btn}
                    className={styles.HideButton}
                    data-testid="fetch-more-button"
                >
                    state check
                </button>
            )}

            {!done && <div className="loading" ref={loader}></div>}
            {done && <NoMoreLoad />}
        </div>
    );
}
