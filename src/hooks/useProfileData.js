import { useState, useEffect } from "react";
import { fetchUserInfo } from "../helpers/profile";

const useProfileData = (username) => {
    const [profileData, setProfileData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const { userData } = await fetchUserInfo(username);
            setProfileData(userData);
        };

        fetchData();
    }, [username]);
    return { profileData };
};

export default useProfileData;
