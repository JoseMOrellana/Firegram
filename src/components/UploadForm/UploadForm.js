import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import PropTypes from "prop-types";

import styles from "./UploadForm.module.css";
import Modal from "../layout/Modal/Modal";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useUser } from "../../context/UserContext";
import useForm from "../../hooks/useForm";
import Button from "../Button/Button";

const UploadForm = ({ showForm, description, submit }) => {
    const { progress } = useUser();
    const [file, setFile] = useState(null);
    const [crop, setCrop] = useState({
        unit: "px",
        width: 30,
        height: 30,
        aspect: 1 / 1,
    });
    const [imageRef, setImageRef] = useState(null);
    const [croppedImg, setCroppedImg] = useState(null);
    const [error, setError] = useState(null);

    const types = ["image/png", "image/jpeg"];

    const getBase64 = (file) => {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const getCroppedImg = (image, crop, filename) => {
        console.log(crop);
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        // As Base64 string
        // const base64Image = canvas.toDataURL('image/jpeg');

        // As a blob
        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    blob.name = filename;
                    resolve(blob);
                },
                "image/jpeg",
                1
            );
        });
    };

    const handleChange = (e) => {
        let selected = e.target.files[0];
        console.log(selected);
        if (selected && types.includes(selected.type)) {
            getBase64(selected)
                .then((result) =>
                    setFile({
                        filename: selected.name,
                        content: result,
                        original: selected,
                    })
                )
                .catch((err) => setError(err));
            setError("");
        } else {
            setFile(null);
            setError("Please select an image file (png or jpg)");
        }
    };

    const onCropComplete = async (crop) => {
        if (imageRef && crop.width && crop.height) {
            const croppedImage = await getCroppedImg(
                imageRef,
                crop,
                file.filename
            );
            setCroppedImg(croppedImage);
        }
    };

    const onImageLoaded = async (image) => {
        setImageRef(image);
    };

    const { inputs, handleInputChange, handleSubmit } = useForm((inputs) => {
        console.log(inputs);
        submit(croppedImg, inputs.description);
        showForm(false);
    });

    return (
        <Modal close={() => showForm(false)}>
            <div className={styles.FormContainer} data-testid="upload-form">
                {progress > 0 && <ProgressBar progress={progress} />}
                <h1>Upload picture</h1>
                <form onSubmit={handleSubmit}>
                    {description && (
                        <textarea
                            placeholder="Add a description"
                            className={styles.TextArea}
                            rows={8}
                            name="description"
                            value={inputs.description}
                            onChange={handleInputChange}
                            data-testid="description-textarea"
                        />
                    )}
                    <label className={styles.FileInput}>
                        <input
                            type="file"
                            onChange={handleChange}
                            data-testid="file-input"
                        />
                        <span>Select picture</span>
                    </label>
                    <div className="output">
                        {error && (
                            <div className="error" data-testid="error-span">
                                {error}
                            </div>
                        )}
                        {file?.filename && <div>{file.filename}</div>}
                        {file && (
                            <ReactCrop
                                src={file.content}
                                crop={crop}
                                onImageLoaded={onImageLoaded}
                                onChange={(newCrop) => setCrop(newCrop)}
                                onComplete={onCropComplete}
                                data-testid="image-crop-component"
                            />
                        )}
                    </div>
                    {imageRef && (
                        <span className={styles.Adjust}>
                            Remember to adjust your crop!
                        </span>
                    )}
                    <Button
                        variant="FormSubmit"
                        type="submit"
                        className={styles.SubmitButton}
                        disabled={!croppedImg}
                    >
                        Save
                    </Button>
                </form>
            </div>
        </Modal>
    );
};

UploadForm.propTypes = {
    showForm: PropTypes.func.isRequired,
    description: PropTypes.bool,
    submit: PropTypes.func.isRequired,
};

export default UploadForm;
