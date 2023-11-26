import React, { useState } from "react";

import {
    Card,
    CardActions,
    CardContent,
    Button,
    TextField,
} from "@mui/material";
import { saveUser } from "../apis/userApi";

interface RegisterUserProps {
    setName:
        | React.Dispatch<React.SetStateAction<string | undefined>>
        | undefined;
    setMobileNumber:
        | React.Dispatch<React.SetStateAction<string | undefined>>
        | undefined;
}

const RegisterUser = ({ setName, setMobileNumber }: RegisterUserProps) => {
    const [naam, setNaam] = useState("");
    const [mn, setmn] = useState("");
    const [processing, setProcessing] = useState(false);

    let handleRegister = async () => {
        if (!naam || !mn) return;
        setProcessing(true);
        try {
            await saveUser({ name: naam, mobileNumber: mn });
            if (setName) setName(naam);
            if (setMobileNumber) setMobileNumber(mn);
        } catch (error) {
            console.log(error);
            alert("Failed to Register User!");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <>
            <Card>
                <CardContent>
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        value={naam}
                        onChange={(e) => setNaam(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        id="mobileNumber"
                        label="Mobile Number"
                        variant="outlined"
                        value={mn}
                        onChange={(e) => setmn(e.target.value)}
                    />
                </CardContent>
                <CardActions
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button
                        size="medium"
                        variant="contained"
                        onClick={handleRegister}
                        disabled={processing}
                    >
                        Register
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};

export default RegisterUser;
