import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Production from "./views/Production";
import Inventory from "./views/Inventory";
//import "./App.css";

function App() {
    const [showProduction, setShowProduction] = useState(true);

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
                        color: showProduction ? "dodgerblue" : "darkgray",
                        cursor: "pointer",
                    }}
                    onClick={() => setShowProduction(true)}
                >
                    Production
                </h5>
                <h5
                    style={{
                        color: showProduction ? "darkgray" : "dodgerblue",
                        cursor: "pointer",
                    }}
                    onClick={() => setShowProduction(false)}
                >
                    Inventory
                </h5>
            </div>
            {showProduction ? <Production /> : <Inventory />}
        </>
    );
}

export default App;
