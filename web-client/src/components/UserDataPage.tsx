import React, { useState } from "react";
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
    location,
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
            <div>
                <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    value={mobileNumber}
                    onChange={handleMobileInput}
                />
            </div>
            <div>
                <button onClick={handleGetLocation}>Get Location</button>
            </div>
        </>
    );
};

export default UserDataPage;
