import React, { useEffect, useState } from "react";
import axios from "axios";

const QrReports = () => {
    const [reports, setReports] = useState([]);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        fetchReports();
    }, []);

    let fetchReports = async () => {
        setProcessing(true);
        try {
            //let url = "http://localhost:8080/qr_reports";
            let url = "http://139.84.173.86/qr_reports";
            let reports = (
                await axios({
                    url,
                    method: "GET",
                })
            ).data;
            setReports(reports);
        } catch (error) {
            console.log(error);
            alert("Failed to load reports!");
        } finally {
            setProcessing(false);
        }
    };

    if (processing) {
        return (
            <div>
                <h4
                    style={{
                        margin: 10,
                        color: "dodgerblue",
                        fontSize: "1.2rem",
                    }}
                >
                    Processing...
                </h4>
            </div>
        );
    }

    return (
        <>
            {reports.map((report) => (
                <div
                    key={report._id}
                    style={{
                        margin: 5,
                        padding: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        border: "1px solid gray",
                    }}
                >
                    <p>{report.mobileNumber}</p>
                    <p>{report.latitude}</p>
                    <p>{report.longitude}</p>
                    <p>{report.reason}</p>
                </div>
            ))}
        </>
    );
};

export default QrReports;
