import { ethers, keccak256, toUtf8Bytes } from "ethers";
import { useContext, useEffect, useState } from "react";
import { sendDataToServer, sendQRReport } from "../apis/authentication";
import { ABI, ADDRESS } from "../contracts/ProductCollection";
import { AppDataContext } from "../providers/appDataProvider";
import {
    TextField,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
} from "@mui/material";

interface ProdData {
    uniqueId: string;
    name: string;
    qty: string;
    description: string;
    batch_id: string;
    lot_id: string;
    mfg_date: number;
}

const Authenticator = () => {
    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState("");
    const [reportAlert, setReportAlert] = useState("");
    const [productName, setProductName] = useState("");

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
            setReportAlert("fake_qr");
            setMessage("Fake Product!");
        } else if (prod[1]) {
            setReportAlert("duplicate_qr");
            setMessage("Duplicate QR! it's already used!");
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
        console.log(prod);
        setProdData(prod as ProdData);
        setMessage("Product is Authentic!");
    };

    let reportFakeQr = async () => {
        if (!mobileNumber || !location.latitude || !location.longitude) return;
        sendQRReport({
            mobileNumber,
            latitude: location.latitude,
            longitude: location.longitude,
            reason: "Fake QR Code",
            product_name: productName,
        });
    };

    let reportDuplicateQr = async () => {
        if (!mobileNumber || !location.latitude || !location.longitude) return;
        sendQRReport({
            mobileNumber,
            latitude: location.latitude,
            longitude: location.longitude,
            reason: "Duplicate QR Code",
            product_name: productName,
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

    let handleQrReport = async () => {
        if (!productName) return alert("Please enter the product name");
        setProcessing(true);
        try {
            if (reportAlert == "duplicate_qr") {
                await reportDuplicateQr();
            } else {
                await reportFakeQr();
            }
            alert("Thank you for reporting!");
        } catch (error) {
            console.log(error);
            alert("Failed to report");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div style={{ padding: 10 }}>
            {reportAlert.length ? (
                <Card>
                    <CardContent>
                        <Typography color="error" variant="h4">
                            {message}
                        </Typography>
                        <Typography color="#999">
                            Please help us to fight against fake products by
                            reporting it!
                        </Typography>

                        <br />
                        <br />

                        <TextField
                            label="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </CardContent>
                    <CardActions
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Button color="warning">Take Product Picture</Button>
                        <div style={{ height: 10 }}></div>
                        <Button
                            color="warning"
                            variant="contained"
                            onClick={handleQrReport}
                            disabled={processing}
                        >
                            Send Report
                        </Button>
                    </CardActions>
                </Card>
            ) : (
                <Card>
                    <CardContent>
                        <Typography color="success" variant="h4">
                            {message}
                        </Typography>
                    </CardContent>
                </Card>
            )}
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
                        <b>Batch ID : </b>
                        {prodData.batch_id}
                    </p>
                    <p>
                        <b>Lot ID : </b>
                        {prodData.lot_id}
                    </p>
                    <p>
                        <b>Manufacturing Date : </b>
                        {new Date(prodData.mfg_date).toLocaleDateString()}
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
