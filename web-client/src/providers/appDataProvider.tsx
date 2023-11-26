import { createContext, useEffect, useState } from "react";

export interface LocationInterface {
    latitude: number | undefined;
    longitude: number | undefined;
}

export interface AppDataContextInterface {
    location: LocationInterface;
    setLocation: React.Dispatch<React.SetStateAction<LocationInterface>>;
    name: string | undefined;
    setName: React.Dispatch<React.SetStateAction<string | undefined>>;
    mobileNumber: string | undefined;
    setMobileNumber: React.Dispatch<React.SetStateAction<string | undefined>>;
    qrData: string | undefined;
    setQrData: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const AppDataContext = createContext<AppDataContextInterface>(
    {} as AppDataContextInterface
);

export const AppDataProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [location, setLocation] = useState<LocationInterface>({
        latitude: undefined,
        longitude: undefined,
    });
    const [name, setName] = useState<string | undefined>();
    const [mobileNumber, setMobileNumber] = useState<string | undefined>();
    const [qrData, setQrData] = useState<string>();

    useEffect(() => {
        let userStr = localStorage.getItem("user");
        if (userStr && userStr.length) {
            let user = JSON.parse(userStr);
            let { name, mobileNumber } = user;
            setName(name);
            setMobileNumber(mobileNumber);
        }
    }, []);

    useEffect(() => {
        if (name && mobileNumber) {
            let str = JSON.stringify({ name, mobileNumber });
            localStorage.setItem("user", str);
        }
    }, [name, mobileNumber]);

    return (
        <AppDataContext.Provider
            value={{
                location,
                setLocation,
                name,
                setName,
                mobileNumber,
                setMobileNumber,
                qrData,
                setQrData,
            }}
        >
            {children}
        </AppDataContext.Provider>
    );
};
