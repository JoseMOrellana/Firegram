import React, { createContext, useContext, useState } from "react";
import { getPosts } from "../helpers/posts";
import { useUser } from "./UserContext";

const InfiniteScrollContext = createContext();

export function useInfiniteScroll() {
    return useContext(InfiniteScrollContext);
}

export function InfiniteScrollProvider({
    children,
    fnc,
    limit,
    followingOnly,
}) {
    const { currentUser } = useUser();
    const [last, setLast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    let followingArr;
    if (followingOnly) {
        followingArr = currentUser.following;
    }
    async function fetchPosts() {
        setLoading(true);
        const [lastOne, results] = await fnc(last, limit, followingArr);
        console.log(lastOne, results);
        if (results.length < limit) {
            setDone(true);
        }
        console.log(results.length);
        setLast(lastOne);
        setLoading(false);
        return results;
    }

    const value = {
        last,
        loading,
        done,
        fetchPosts,
    };

    return (
        <InfiniteScrollContext.Provider value={value}>
            {children}
        </InfiniteScrollContext.Provider>
    );
}
