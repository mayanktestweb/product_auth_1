import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

interface QrScannerProps {
    qrData: string | undefined;
    setQrData:
        | React.Dispatch<React.SetStateAction<string | undefined>>
        | undefined;
}

const QrScanner = ({ qrData, setQrData }: QrScannerProps) => {
    return (
        <>
            <QrReader
                onResult={(result, error) => {
                    if (!!result && setQrData) {
                        setQrData(result?.getText());
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                style={{ width: "100%" }}
                constraints={{ facingMode: "environment" }}
            />
            <p>{qrData}</p>
        </>
    );
};

export default QrScanner;
