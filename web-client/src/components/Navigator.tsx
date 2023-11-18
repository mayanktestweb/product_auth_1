import React, { useState, useEffect } from "react";
import { AppDataContext } from "../providers/appDataProvider";
import UserDataPage from "./UserDataPage";
import QrScanner from "./QrScanner";
import Authenticator from "./Authenticator";

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
    } = React.useContext(AppDataContext);

    if (!location.latitude || !location.longitude || !mobileNumber) {
        return (
            <UserDataPage
                location={location}
                setLocation={setLocation}
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
            />
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
            <div>
                <button onClick={handleShowScanner}>Scan Product QR</button>
            </div>
            <div>
                <button onClick={handleShowAuthenticator}>
                    Authenticate Product
                </button>
            </div>
        </>
    );
};

export default Navigator;
