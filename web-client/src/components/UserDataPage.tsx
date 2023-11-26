import React from "react";
import { Box, Tabs, Tab, AppBar } from "@mui/material";
import RegisterUser from "./RegisterUser";
import LoginUser from "./LoginUser";

interface UserDataPageProps {
    name: string | undefined;
    setName:
        | React.Dispatch<React.SetStateAction<string | undefined>>
        | undefined;
    mobileNumber: string | undefined;
    setMobileNumber:
        | React.Dispatch<React.SetStateAction<string | undefined>>
        | undefined;
}

const UserDataPage = ({
    mobileNumber,
    setMobileNumber,
    name,
    setName,
}: UserDataPageProps) => {
    const [tabIndex, setTabIndex] = React.useState(0);

    let handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setMobileNumber) {
            setMobileNumber(e.target.value);
        }
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={tabIndex}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Register" {...a11yProps(0)} />
                    <Tab label="Login" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={tabIndex} index={0}>
                <RegisterUser
                    setName={setName}
                    setMobileNumber={setMobileNumber}
                />
            </CustomTabPanel>
            <CustomTabPanel value={tabIndex} index={1}>
                <LoginUser
                    setName={setName}
                    setMobileNumber={setMobileNumber}
                />
            </CustomTabPanel>
        </>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default UserDataPage;
