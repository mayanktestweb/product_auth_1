import React, { useState } from "react";
import { AppDataContext } from "../providers/appDataProvider";
import UserDataPage from "./UserDataPage";
import UserGeolocation from "./UserGeolocation";
import QrScanner from "./QrScanner";
import Authenticator from "./Authenticator";
import { Button } from "@mui/material";

const Navigator = () => {
    const [showScanner, setShowScanner] = useState(false);
    const [showAuthenticator, setShowAuthenticator] = useState(false);

    let {
        location,
        setLocation,
        mobileNumber,
        setMobileNumber,
        qrData,
        setQrData,
        setName,
    } = React.useContext(AppDataContext);

    if (!mobileNumber) {
        return (
            <UserDataPage setName={setName} setMobileNumber={setMobileNumber} />
        );
    } else if (mobileNumber && (!location.latitude || !location.longitude)) {
        return (
            <UserGeolocation location={location} setLocation={setLocation} />
        );
    }

    let handleShowScanner = () => {
        setShowAuthenticator(false);
        setShowScanner(true);
    };

    let handleShowAuthenticator = () => {
        setShowScanner(false);
        setShowAuthenticator(true);
    };

    return (
        <>
            <div>
                {showScanner && (
                    <QrScanner qrData={qrData} setQrData={setQrData} />
                )}
            </div>
            <div>{showAuthenticator && <Authenticator />}</div>
            <div>{qrData}</div>
            <div
                style={{
                    padding: 10,
                    textAlign: "center",
                }}
            >
                <Button onClick={handleShowScanner} variant="outlined">
                    Scan Product QR
                </Button>
            </div>
            <div
                style={{
                    padding: 10,
                    textAlign: "center",
                }}
            >
                <Button onClick={handleShowAuthenticator} variant="contained">
                    Authenticate Product
                </Button>
            </div>
        </>
    );
};

export default Navigator;
