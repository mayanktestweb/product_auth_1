import axios from "axios";

//let BASE_URL = "https://crocket-dune.publicvm.com";
let BASE_URL = "http://localhost:8080";

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
        let url = BASE_URL + "/verify";

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
    product_name,
}: {
    mobileNumber: string;
    latitude: number;
    longitude: number;
    reason: string;
    product_name: string;
}) => {
    return new Promise((resolve, reject) => {
        let url = BASE_URL + "/qr_reports";
        axios({
            method: "POST",
            url,
            data: { mobileNumber, latitude, longitude, reason, product_name },
        })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
};

export const fetchQrReports = () => {
    return new Promise((resolve, reject) => {
        let url = BASE_URL + "/qr_reports";
        axios({
            url,
            method: "GET",
        })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
};
