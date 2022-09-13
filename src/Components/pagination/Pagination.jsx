import React from "react";
import { useSelector } from "react-redux";

function Pagination({ nextPage, prevPage, page, setPage, totalPages }) {
    const { cart } = useSelector((state) => state.cart);

    return (
        <>
            {cart.length > 5 && (
                <div className="pagination">
                    <p className="text">
                        {page}/{totalPages}
                    </p>
                    <button onClick={prevPage} className="page">
                        &larr;
                    </button>
                    {[...Array(totalPages).keys()].map((el) => (
                        <button
                            onClick={() => setPage(el + 1)}
                            key={el}
                            className={`page ${
                                page === el + 1 ? "active" : ""
                            }`}
                        >
                            {el + 1}
                        </button>
                    ))}
                    <button onClick={nextPage} className="page">
                        &rarr;
                    </button>
                </div>
            )}
        </>
    );
}

export default Pagination;
