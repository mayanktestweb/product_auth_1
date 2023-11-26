import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    TextField,
} from "@mui/material";
import { getUser } from "../apis/userApi";

interface IUser {
    name: String | undefined;
    mobileNumber: String | undefined;
}

interface LoginUserProps {
    setName:
        | React.Dispatch<React.SetStateAction<string | undefined>>
        | undefined;
    setMobileNumber:
        | React.Dispatch<React.SetStateAction<string | undefined>>
        | undefined;
}

const LoginUser = ({ setName, setMobileNumber }: LoginUserProps) => {
    const [enableOtp, setEnableOtp] = React.useState(false);
    const [user, setUser] = React.useState<IUser>();
    const [mn, setMn] = React.useState("");
    const [otp, setOtp] = React.useState("");
    const [processing, setProcessing] = React.useState(false);

    let handleButtonClick = async () => {
        if (enableOtp) {
            if (otp.length) saveUserToContext();
            else return alert("Please enter otp...");
        } else {
            await fetchUser();
        }
    };

    let fetchUser = async () => {
        setProcessing(true);
        try {
            let users: IUser[] = (await getUser({
                mobileNumber: mn,
            })) as IUser[];
            console.log(users);
            setUser(users[0]);
            setEnableOtp(true);
        } catch (error) {
            console.log(error);
            alert("Failed to Login!");
        } finally {
            setProcessing(false);
        }
    };

    let saveUserToContext = () => {
        if (setName) setName(user?.name as string | undefined);
        if (setMobileNumber)
            setMobileNumber(user?.mobileNumber as string | undefined);
    };

    return (
        <>
            <Card>
                <CardContent>
                    <TextField
                        id="mobileNumber"
                        label="Mobile Number"
                        variant="outlined"
                        value={mn}
                        onChange={(e) => setMn(e.target.value)}
                        disabled={enableOtp}
                    />
                    <br />
                    <br />
                    <TextField
                        id="otp"
                        label="OTP"
                        variant="outlined"
                        disabled={!enableOtp}
                        onChange={(e) => setOtp(e.target.value)}
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
                        onClick={handleButtonClick}
                        disabled={processing}
                    >
                        {enableOtp ? "Login" : "Get OTP"}
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};

export default LoginUser;
