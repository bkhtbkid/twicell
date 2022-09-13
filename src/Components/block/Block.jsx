import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../redux/slices/cartSlice";

function Block({ firstContentIndex, lastContentIndex, search }) {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);

    const onClickRemoveProduct = (elem) => {
        dispatch(removeProduct(elem));
    };

    return (
        <div className="block">
            <div
                className="block-top"
                style={{ display: "flex", columnGap: "10px" }}
            >
                <div className="title">Название</div>
                <div className="status">Статус</div>
                <div className="price">Цена</div>
            </div>
            <div className="block-main">
                {cart
                    .filter((elem) => {
                        if (
                            elem.title
                                .toLocaleLowerCase()
                                .includes(search.toLocaleLowerCase())
                        ) {
                            return true;
                        }
                        return false;
                    })

                    .map((elem, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <img
                                src={elem.images[0]}
                                alt=""
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "contain",
                                }}
                            />
                            <Link to={`/products/${index}`}>{elem.title}</Link>
                            <div>{elem.status}</div>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Город</td>
                                        <td>Цена</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(elem.obj).map(
                                        (price, index) => (
                                            <tr key={index}>
                                                <td>{price}</td>
                                                <td>{elem.obj[price]}</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                            <button onClick={() => onClickRemoveProduct(elem)}>
                                Удалить товар
                            </button>
                        </div>
                    ))
                    .slice(firstContentIndex, lastContentIndex)}
            </div>
        </div>
    );
}

export default Block;
