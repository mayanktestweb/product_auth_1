import { createContext, useState } from "react";

export interface LocationInterface {
    latitude: number | undefined;
    longitude: number | undefined;
}

export interface AppDataContextInterface {
    location: LocationInterface;
    setLocation: React.Dispatch<React.SetStateAction<LocationInterface>>;
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
    const [mobileNumber, setMobileNumber] = useState<string | undefined>();
    const [qrData, setQrData] = useState<string>();

    return (
        <AppDataContext.Provider
            value={{
                location,
                setLocation,
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
