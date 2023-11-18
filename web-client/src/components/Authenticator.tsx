import React, { useState, useEffect, useContext } from "react";
import { AppDataContext } from "../providers/appDataProvider";
import ethers from "ethers";
import keccak256 from "keccak256";
import { ADDRESS, ABI } from "../contracts/ProductCollection";

const Authenticator = () => {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    let { qrData } = useContext(AppDataContext);

    useEffect(() => {
        processQrCode();
    }, []);

    let processQrCode = async () => {
        setProcessing(true);
        //console.log(import.meta.env.VITE_TEST_ENV);
        try {
        } catch (error) {
            console.log(error);
            setError(true);
            setMessage("Something went wrong!");
        } finally {
            setProcessing(false);
        }
    };

    let validateOnSmartContract = async () => {
        let provider = ethers.getDefaultProvider(
            import.meta.env.VITE_MUMBAI_RPC_URL
        );

        let id = keccak256(qrData);

        let contract = new ethers.Contract(ADDRESS, ABI, provider);

        let prod = await contract.collection(id);
    };

    let forwardToServer = async () => {};

    if (processing) {
        return (
            <div
                style={{
                    padding: 10,
                }}
            >
                <h4
                    style={{
                        color: "dodgerblue",
                    }}
                >
                    Processing...
                </h4>
            </div>
        );
    }

    return <div>Authenticator</div>;
};

export default Authenticator;
