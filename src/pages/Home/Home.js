import React, { useState, useRef, useEffect } from "react";

import styles from "./Home.module.css";
import handleObserver from "../../helpers/infiniteScroll";
import NoMoreLoad from "../../components/NoMoreLoad/NoMoreLoad";
import { useInfiniteScroll } from "../../context/InfiniteScrollContext";
import PostCard from "./PostCard/PostCard";
import Spinner from "../../components/Spinner/Spinner";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const { fetchPosts, loading, done } = useInfiniteScroll();
    const loader = useRef(null);
    const btn = useRef(null);

    const updateGrids = async () => {
        const results = await fetchPosts();
        const newPostCards = results.map((post) => {
            return <PostCard post={post} />;
        });
        setPosts(posts.concat(newPostCards));
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
        <div className="content" data-testid="home-page">
            <ul className={styles.Container}>{posts}</ul>
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
