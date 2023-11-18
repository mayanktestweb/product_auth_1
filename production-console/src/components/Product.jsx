import React from "react";
import QRCode from "react-qr-code";

const Product = ({ product }) => {
    return (
        <div
            style={{
                marginBottom: 10,
                border: "1px solid gray",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
            }}
        >
            <div>
                <ul>
                    <li>
                        <b>Unique Id :</b> {product.uniqueId}
                    </li>
                    <li>
                        <b>Name :</b> {product.name}
                    </li>
                    <li>
                        <b>Description :</b> {product.description}
                    </li>
                    <li>
                        <a
                            href={`https://mumbai.polygonscan.com/tx/${product.tx_hash}`}
                        >
                            View Transaction
                        </a>
                    </li>
                </ul>
            </div>
            <div
                style={{
                    padding: 10,
                }}
            >
                <QRCode value={product.qr_data} />
            </div>
        </div>
    );
};

export default Product;
