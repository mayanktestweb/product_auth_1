import axios from "axios";

export const sendDataToServer = ({
    sc_id,
    qrData,
    key,
}: {
    sc_id: string;
    qrData: string;
    key: string;
}) => {
    return new Promise((resolve, reject) => {
        let url = "http://localhost:8080/verify";

        axios({
            method: "POST",
            url,
            data: { sc_id, qrData, key },
        })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
};

export const sendQRReport = ({
    mobileNumber,
    latitude,
    longitude,
    reason,
}: {
    mobileNumber: string;
    latitude: number;
    longitude: number;
    reason: string;
}) => {
    return new Promise((resolve, reject) => {
        let url = "http://localhost:8080/qr_reports";
        axios({
            method: "POST",
            url,
            data: { mobileNumber, latitude, longitude, reason },
        })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
};

export const fetchQrReports = () => {
    return new Promise((resolve, reject) => {
        let url = "http://localhost:8080/qr_reports";
        axios({
            url,
            method: "GET",
        })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
};
