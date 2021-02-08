import React, { createContext, useContext, useState } from "react";
import ImageDisplay from "../components/ImageDisplay/ImageDisplay";
import Modal from "../components/layout/Modal/Modal";

const ShowImageContext = createContext();

export function useShowImage() {
    return useContext(ShowImageContext);
}

export function ShowImageProvider({ children }) {
    const [image, setImage] = useState(null);
    const [user, setUser] = useState(null);

    const value = {
        setImage,
        setUser,
    };

    return (
        <ShowImageContext.Provider value={value}>
            {image && (
                <Modal
                    close={() => {
                        setImage(null);
                        setUser(null);
                    }}
                >
                    <ImageDisplay selectedImg={image} user={user} />
                </Modal>
            )}
            {children}
        </ShowImageContext.Provider>
    );
}
