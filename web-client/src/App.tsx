import { useState } from "react";
import { QrReader } from "react-qr-reader";

import { AppDataContext, AppDataProvider } from "./providers/appDataProvider";

import UserDataPage from "./components/UserDataPage";
import Navigator from "./components/Navigator";

function App() {
    return (
        <AppDataProvider>
            <Navigator />
        </AppDataProvider>
    );
}

export default App;
