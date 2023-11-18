import React from "react";
import { LocationInterface } from "../providers/appDataProvider";

interface UserDataPageProps {
    mobileNumber: string | undefined;
    setMobileNumber:
        | React.Dispatch<React.SetStateAction<string | undefined>>
        | undefined;
    location: LocationInterface;
    setLocation:
        | React.Dispatch<React.SetStateAction<LocationInterface>>
        | undefined;
}

const UserDataPage = ({
    mobileNumber,
    setMobileNumber,
    setLocation,
}: UserDataPageProps) => {
    let handleGetLocation = () => {
        let locationG = navigator.geolocation;

        console.log(locationG);

        locationG.getCurrentPosition(
            (data) => {
                console.log(mobileNumber);
                console.log(data.coords.latitude, data.coords.longitude);
                if (!setLocation) return;
                setLocation({
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                });
            },
            (err) => {
                console.log("error!");
                console.log(err);
            }
        );
    };

    let handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setMobileNumber) {
            setMobileNumber(e.target.value);
        }
    };

    return (
        <>
            <div
                style={{
                    textAlign: "center",
                    paddingTop: 50,
                }}
            >
                <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    value={mobileNumber}
                    onChange={handleMobileInput}
                    style={{
                        fontSize: "1.2rem",
                    }}
                />
            </div>
            <div
                style={{
                    padding: "10px 0px",
                    textAlign: "center",
                }}
            >
                <button
                    style={{ fontSize: "1rem" }}
                    onClick={handleGetLocation}
                >
                    Get Location
                </button>
            </div>
        </>
    );
};

export default UserDataPage;
