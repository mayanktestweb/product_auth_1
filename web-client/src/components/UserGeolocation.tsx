import React from "react";
import { LocationInterface } from "../providers/appDataProvider";

interface UserGeolocationProps {
    location: LocationInterface;
    setLocation:
        | React.Dispatch<React.SetStateAction<LocationInterface>>
        | undefined;
}

const UserGeolocation = ({ setLocation }: UserGeolocationProps) => {
    let handleGetLocation = () => {
        let locationG = navigator.geolocation;

        console.log(locationG);

        locationG.getCurrentPosition(
            (data) => {
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

    return (
        <div>
            <button onClick={handleGetLocation}>Get Location</button>
        </div>
    );
};

export default UserGeolocation;
