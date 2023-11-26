import React, { useState } from "react";
import { AppDataContext } from "../providers/appDataProvider";
import UserDataPage from "./UserDataPage";
import UserGeolocation from "./UserGeolocation";
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
        name,
        setName,
    } = React.useContext(AppDataContext);

    if (!mobileNumber) {
        return (
            <UserDataPage
                name={name}
                setName={setName}
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
            />
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
                <button
                    style={{ fontSize: "1.2rem" }}
                    onClick={handleShowScanner}
                >
                    Scan Product QR
                </button>
            </div>
            <div
                style={{
                    padding: 10,
                    textAlign: "center",
                }}
            >
                <button
                    style={{ fontSize: "1.2rem" }}
                    onClick={handleShowAuthenticator}
                >
                    Authenticate Product
                </button>
            </div>
        </>
    );
};

export default Navigator;
