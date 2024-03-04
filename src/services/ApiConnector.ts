import axios from "axios";
import { AxiosRequestConfig } from "axios";

export const axiosInstance=axios.create({});

interface PropsType {
    method: string;
    url: string;
    bodyData?: unknown;
    headers?: AxiosRequestConfig["headers"];
    params?: unknown;
}

const ApiConnector = ({ method, url, bodyData, headers, params }: PropsType) => {
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData,
        headers,
        params,
    });
};

export default ApiConnector;