import Products from "./pages/Products";
import ProductsEdit from "./pages/edit/Edit";
import ProductsCreate from "./pages/Create";
import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

export const ImageContext = createContext();
export const IdContext = createContext();

function App() {
    const [images, setImages] = useState([]);
    const [id, setId] = useState(0);

    return (
        <ImageContext.Provider value={{ images, setImages }}>
            <IdContext.Provider value={{ id, setId }}>
                <section
                    className="App"
                    style={{ maxWidth: "900px", margin: "0 auto" }}
                >
                    <Routes>
                        <Route path="/products" element={<Products />} />
                        <Route
                            path="/products/create"
                            element={<ProductsCreate />}
                        />
                        <Route
                            path="/products/:id"
                            element={<ProductsEdit />}
                        />
                        <Route path="*" element={<Products />} />
                    </Routes>
                </section>
            </IdContext.Provider>
        </ImageContext.Provider>
    );
}

export default App;
