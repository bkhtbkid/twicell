import React from "react";
import { Link } from "react-router-dom";

function Top() {
    return (
        <div
            className="top"
            style={{ display: "flex", justifyContent: "space-between" }}
        >
            <div className="products">Товары</div>
            <button className="add">
                <Link to="/products/create">Добавить</Link>
            </button>
        </div>
    );
}

export default Top;
