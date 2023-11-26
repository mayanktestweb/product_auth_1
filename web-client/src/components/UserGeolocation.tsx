import React from "react";
import { LocationInterface } from "../providers/appDataProvider";
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
} from "@mui/material";

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
        <Card>
            <CardContent>
                <Typography color="#999" style={{ textAlign: "center" }}>
                    This app needs to know your current location!
                </Typography>
            </CardContent>
            <CardActions
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleGetLocation}
                >
                    Get Location
                </Button>
            </CardActions>
        </Card>
    );
};

export default UserGeolocation;
