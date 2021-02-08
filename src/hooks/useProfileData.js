import { useState, useEffect } from "react";
import { fetchUserInfo } from "../helpers/profile";

const useProfileData = (username) => {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        console.log(username);
        const fetchData = async () => {
            const { userData } = await fetchUserInfo(username);
            setUserData(userData);
        };

        fetchData();
    }, [username]);
    return { userData };
};

export default useProfileData;
