import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Production from "./views/Production";
import Inventory from "./views/Inventory";
import QrReports from "./views/QrReports";
//import "./App.css";

const PROD = "production";
const INVT = "inventory";
const RPRT = "reports";

function App() {
    const [view, setView] = useState(PROD);

    return (
        <>
            <div
                style={{
                    padding: 10,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    borderBottom: "2px solid gray",
                }}
            >
                <h5
                    style={{
                        color: view == PROD ? "dodgerblue" : "darkgray",
                        cursor: "pointer",
                    }}
                    onClick={() => setView(PROD)}
                >
                    Production
                </h5>
                <h5
                    style={{
                        color: view == INVT ? "dodgerblue" : "darkgray",
                        cursor: "pointer",
                    }}
                    onClick={() => setView(INVT)}
                >
                    Inventory
                </h5>
                <h5
                    style={{
                        color: view == RPRT ? "dodgerblue" : "darkgray",
                        cursor: "pointer",
                    }}
                    onClick={() => setView(RPRT)}
                >
                    Reports
                </h5>
            </div>
            {view == PROD && <Production />}
            {view == INVT && <Inventory />}
            {view == RPRT && <QrReports />}
        </>
    );
}

export default App;
