import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";

const Inventory = () => {
    const [processing, setProcessing] = useState(false);
    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState();

    useEffect(() => {
        fetchAllProducts();
    }, []);

    let fetchAllProducts = async () => {
        setProcessing(true);
        let url = "http://localhost:8080/products";
        try {
            let products = await axios({
                method: "GET",
                url,
            });
            console.log(products);
            setProducts(products.data);
        } catch (error) {
            console.log(error);
            alert("Failed to fetch products");
        } finally {
            setProcessing(false);
        }
    };

    if (processing) {
        return <div>Please wait...</div>;
    }

    return (
        <>
            <h5>Inventory</h5>
            {product && <Product product={product} />}
            <div>
                {products.map((product) => (
                    <div
                        key={product.uniqueId}
                        onClick={() => {
                            setProduct(product);
                            console.log("it workded");
                        }}
                        style={{
                            margin: 5,
                            padding: 5,
                            border: "1px solid gray",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <p>{product.uniqueId}</p>
                        <p>{product.name}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Inventory;
