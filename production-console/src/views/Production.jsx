import React, { useState } from "react";
import axios from "axios";

const Production = () => {
    const [name, setName] = useState();
    const [qty, setQty] = useState();
    const [description, setDescription] = useState();

    const [processing, setProcessing] = useState(false);

    let produceFunc = async () => {
        if (!name || !qty || !description) {
            alert("Please enter all fields!");
            return;
        }
        let url = "http://localhost:8080/product";
        setProcessing(true);
        try {
            await axios({
                url,
                method: "POST",
                data: { name, qty, description, uniqueId: Date.now() },
            });

            alert("Product saved!");
            setName("");
            setQty("");
            setDescription("");
        } catch (error) {
            console.log(error);
            alert("Something went wrong!");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <>
            <div className="inputbox">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
            </div>
            <div className="inputbox">
                <input
                    type="text"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    placeholder="Qty"
                />
            </div>
            <div className="inputbox">
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
            </div>
            <div className="inputbox">
                <button onClick={produceFunc} disabled={processing}>
                    Create Product
                </button>
            </div>
        </>
    );
};

export default Production;
