import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { updateProduct } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "../Image";
import { ImageContext } from "../../App";
import Cities from "./Cities";

function Edit() {
    const [title, setTitle] = useState("");
    const editorRef = useRef();
    const dispatch = useDispatch();
    const { images, setImages } = useContext(ImageContext);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const [status, setStatus] = useState("active");
    const [obj, setObj] = useState();
    const params = useParams();
    const [price, setPrice] = useState(0);

    const { cart } = useSelector((state) => state.cart);

    const rem = Array.from(cart).find((elem) => elem.id == params.id);

    const onClickUpdate = () => {
        if (
            title === "" ||
            editorRef.current.getContent({ format: "text" }) === "" ||
            obj === undefined ||
            Object.values(obj) == "" ||
            Object.values(obj) <= 0 ||
            images.length === 0
        )
            alert("Заполните все поля!");
        else {
            const product = {
                title,
                text: editorRef.current.getContent({ format: "text" }),
                images,
                id: params.id,
                status,
                obj,
                isChecked,
            };
            dispatch(updateProduct(product));
            navigate("/products");
        }
    };

    useEffect(() => {
        setTitle(rem.title);
        setStatus(rem.status);
        setObj(rem.obj);
        setImages(rem.images);
        setIsChecked(rem.isChecked);
    }, []);

    const onInputChangeAllCities = (e) => {
        setObj({ "Все города": e });
    };

    return (
        <div>
            <div className="create-top">
                <button>
                    <Link to="/products">Назад</Link>
                </button>
            </div>
            <div className="create-main">
                <p>Изменить название</p>
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <p>Описание</p>
                <Editor
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={rem.text}
                    apiKey="v5ee6m291q9u2txo5mbl1scaqbrttg7l0nc0wb8zqa0edk3z"
                />
                <Image rem={rem} />
                <div>
                    <p>Статус товара</p>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="active">Активный</option>
                        <option value="archive">Архивный</option>
                    </select>
                </div>
                <div>
                    <p>Цена</p>
                    <div>
                        <div className="top">
                            <input
                                type="checkbox"
                                checked={isChecked ? "checked" : ""}
                                onChange={() => setIsChecked(!isChecked)}
                            />
                            Одна цена для всех городов
                            <input
                                type="text"
                                disabled={!isChecked ? "disabled" : ""}
                                onChange={(e) =>
                                    onInputChangeAllCities(e.target.value)
                                }
                                value={obj ? obj["Все города"] : price}
                            />
                        </div>
                        {!isChecked && (
                            <table>
                                <thead>
                                    <tr>
                                        <td>Город</td>
                                        <td>Цена</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Cities
                                        obj={obj}
                                        setObj={setObj}
                                        price={price}
                                        setPrice={setPrice}
                                    />
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                <button onClick={onClickUpdate}>Изменить товар</button>
            </div>
        </div>
    );
}

export default Edit;
