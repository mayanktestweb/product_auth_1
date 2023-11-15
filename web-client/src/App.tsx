import { useState } from "react";
import { QrReader } from "react-qr-reader";

function App() {
    const [data, setData] = useState("No Result");

    return (
        <>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.getText());
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                // containerStyle={{
                //     innerWidth: 500,
                //     outerWidth: 550,
                //     innerHeight: 500,
                //     outerHeight: 550,
                // }}
                // videoContainerStyle={{
                //     innerWidth: 200,
                //     outerWidth: 250,
                //     innerHeight: 200,
                //     outerHeight: 250,
                // }}
                // videoStyle={{
                //     innerWidth: 200,
                //     outerWidth: 250,
                //     innerHeight: 200,
                //     outerHeight: 250,
                // }}
                style={{ width: "100%" }}
                constraints={{ facingMode: "environment" }}
            />
            <p>{data}</p>
        </>
    );
}

export default App;
