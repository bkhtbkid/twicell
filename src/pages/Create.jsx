import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { addProduct } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import Image from "./Image";
import { IdContext, ImageContext } from "../App";
import { cities } from "../cities";

function Create() {
    const [title, setTitle] = useState("");
    const editorRef = useRef();
    const dispatch = useDispatch();
    const { images } = useContext(ImageContext);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const { id, setId } = useContext(IdContext);
    const [status, setStatus] = useState("active");
    const [obj, setObj] = useState();

    const onClickAdd = () => {
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
                id,
                status,
                obj,
                isChecked,
            };
            dispatch(addProduct(product));
            navigate("/products");
            setId(id + 1);
        }
    };

    const onInputChangeAllCities = (e) => {
        setObj({
            "Все города": e,
        });
    };

    const onInputChangeCity = (e, cit) => {
        setObj((args) => ({ ...args, [cit]: e }));
    };

    return (
        <div>
            <div className="create-top">
                <button>
                    <Link to="/products">Назад</Link>
                </button>
            </div>
            <div className="create-main">
                <p>Название товара</p>
                <div>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <p>Описание</p>
                <Editor
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue=""
                    apiKey="v5ee6m291q9u2txo5mbl1scaqbrttg7l0nc0wb8zqa0edk3z"
                />
                <Image />
                <div>
                    <p>Статус товара</p>
                    <select onChange={(e) => setStatus(e.target.value)}>
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
                                onClick={() => setIsChecked(!isChecked)}
                            />
                            Одна цена для всех городов
                            <input
                                type="text"
                                onChange={(e) =>
                                    onInputChangeAllCities(e.target.value)
                                }
                                disabled={!isChecked ? "disabled" : ""}
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
                                    {cities.map((city) => (
                                        <tr key={city.id}>
                                            <td>{city.name}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    onChange={(e) =>
                                                        onInputChangeCity(
                                                            e.target.value,
                                                            city.name
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                <button onClick={onClickAdd}>Добавить товар</button>
            </div>
        </div>
    );
}

export default Create;
