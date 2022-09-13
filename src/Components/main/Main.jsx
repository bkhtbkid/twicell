import React, { useState } from "react";
import { useSelector } from "react-redux";
import Search from "../search/Search";
import usePagination from "../../hooks/usePaginations";
import Block from "../block/Block";
import Pagination from "../pagination/Pagination";

function Main() {
    const { cart } = useSelector((state) => state.cart);
    const contentPerPage = 5;
    const [search, setSearch] = useState("");

    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage,
        count: cart.length,
    });

    

    return (
        <main>
            <Search search={search} setSearch={setSearch} />
            <Block
                search={search}
                firstContentIndex={firstContentIndex}
                lastContentIndex={lastContentIndex}
            />
            <Pagination
                nextPage={nextPage}
                prevPage={prevPage}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
            />
        </main>
    );
}

export default Main;
