import axios from "axios";

//let BASE_URL = "https://crocket-dune.publicvm.com";
let BASE_URL = "http://localhost:8080";

export const saveUser = ({
    name,
    mobileNumber,
}: {
    name: string;
    mobileNumber: string;
}) => {
    return new Promise((resolve, reject) => {
        let url = BASE_URL + "/user";
        console.log(import.meta.env.BASE_URL);
        console.log(BASE_URL);
        console.log(url);

        axios({
            url,
            method: "POST",
            data: { name, mobileNumber },
        })
            .then((res) => resolve(res.status))
            .catch((err) => reject(err));
    });
};

export const getUser = ({ mobileNumber }: { mobileNumber: string }) => {
    return new Promise((resolve, reject) => {
        let url = `${BASE_URL}/user/${mobileNumber}`;

        axios({
            url,
            method: "GET",
        })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
};
