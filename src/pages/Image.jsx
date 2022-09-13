import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ImageContext } from "../App";

function Image({ rem }) {
    const [imageFiles, setImageFiles] = useState([]);
    const { images, setImages } = useContext(ImageContext);
    const params = useParams();

    const changeHandler = (e) => {
        const { files } = e.target;
        const validImageFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            validImageFiles.push(file);
        }
        if (validImageFiles.length) {
            setImageFiles(validImageFiles);
            return;
        }
    };

    useEffect(() => {
        const images = [],
            fileReaders = [];
        if (params.id) {
            setImages([]);
        } else {
            setImages(images);
        }
        let isCancel = false;
        if (imageFiles.length) {
            imageFiles.forEach((file) => {
                const fileReader = new FileReader();
                fileReaders.push(fileReader);
                fileReader.onload = (e) => {
                    const { result } = e.target;
                    if (result) {
                        images.push(result);
                    }
                    if (images.length === imageFiles.length && !isCancel) {
                        setImages(images);
                    }
                };
                fileReader.readAsDataURL(file);
            });
        }
        return () => {
            isCancel = true;
            fileReaders.forEach((fileReader) => {
                if (fileReader.readyState === 1) {
                    fileReader.abort();
                }
            });
        };
    }, [imageFiles]);

    return (
        <div className="App">
            <form>
                <p>
                    <label htmlFor="file">Добавить картинки</label>
                    <input
                        type="file"
                        id="file"
                        onChange={changeHandler}
                        accept="image/png, image/jpg, image/jpeg"
                        multiple
                    />
                </p>
            </form>
            {images.length > 0 ? (
                <div>
                    {images.map((image, idx) => {
                        return (
                            <p key={idx}>
                                <img
                                    src={image}
                                    alt=""
                                    style={
                                        idx === 0
                                            ? {
                                                  width: "450px",
                                                  heigth: "300px",
                                              }
                                            : {
                                                  width: "250px",
                                                  heigth: "150px",
                                              }
                                    }
                                />
                            </p>
                        );
                    })}
                </div>
            ) : null ? (
                rem.images.map((elem, index) => {
                    return (
                        <p key={index}>
                            <img
                                src={elem}
                                alt=""
                                style={
                                    index === 0
                                        ? {
                                              width: "450px",
                                              heigth: "300px",
                                          }
                                        : {
                                              width: "250px",
                                              heigth: "150px",
                                          }
                                }
                            />
                        </p>
                    );
                })
            ) : null}
        </div>
    );
}

export default Image;
