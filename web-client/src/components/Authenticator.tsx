import { ethers, keccak256, toUtf8Bytes } from "ethers";
import { useContext, useEffect, useState } from "react";
import { sendDataToServer, sendQRReport } from "../apis/authentication";
import { ABI, ADDRESS } from "../contracts/ProductCollection";
import { AppDataContext } from "../providers/appDataProvider";

interface ProdData {
    uniqueId: string;
    name: string;
    qty: string;
    description: string;
}

const Authenticator = () => {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const [prodData, setProdData] = useState<ProdData>();

    let { qrData, mobileNumber, location } = useContext(AppDataContext);

    useEffect(() => {
        processQrCode();
    }, []);

    let processQrCode = async () => {
        if (!qrData) return;
        setProcessing(true);
        //console.log(import.meta.env.VITE_TEST_ENV);
        try {
            await validateOnSmartContract();
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
        console.log("qrData");
        console.log(qrData);
        if (!qrData) return;
        let id = keccak256(toUtf8Bytes(qrData));
        console.log("id");
        console.log(id);
        let contract = new ethers.Contract(ADDRESS, ABI, provider);

        let prod = await contract.collection(id);
        console.log(prod[0], prod[1], prod[2]);
        if (parseInt(prod[0]) == 0) {
            await reportFakeQr();
        } else if (prod[1]) {
            await reportDuplicateQr();
        } else {
            await forwardToServer(prod[0], qrData, prod[2]);
        }
    };

    let forwardToServer = async (
        sc_id: string,
        qrData: string,
        key: string
    ) => {
        let prod = await sendDataToServer({ sc_id, qrData, key });
        setError(false);
        console.log(prod);
        setProdData(prod as ProdData);
        setMessage("Product is Authentic!");
    };

    let reportFakeQr = async () => {
        setError(true);
        setMessage("Fake Product!");
        if (!mobileNumber || !location.latitude || !location.longitude) return;
        sendQRReport({
            mobileNumber,
            latitude: location.latitude,
            longitude: location.longitude,
            reason: "Fake QR Code",
        });
    };

    let reportDuplicateQr = async () => {
        setError(true);
        setMessage("Duplicate QR! it's already used!");
        if (!mobileNumber || !location.latitude || !location.longitude) return;
        sendQRReport({
            mobileNumber,
            latitude: location.latitude,
            longitude: location.longitude,
            reason: "Duplicate QR Code",
        });
    };

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
                        fontSize: "1.5rem",
                    }}
                >
                    Processing...
                </h4>
            </div>
        );
    }

    return (
        <div style={{ padding: 10 }}>
            <h5 style={{ color: error ? "red" : "green", fontSize: "1.5rem" }}>
                {message}
            </h5>
            {prodData && (
                <>
                    <p>
                        <b>Unique ID : </b> {prodData.uniqueId}
                    </p>
                    <p>
                        <b>Name : </b>
                        {prodData.name}
                    </p>
                    <p>
                        <b>Qty : </b>
                        {prodData.qty}
                    </p>
                    <p>
                        <b>Description : </b>
                        {prodData.description}
                    </p>
                </>
            )}
        </div>
    );
};

export default Authenticator;
