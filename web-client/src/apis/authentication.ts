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
