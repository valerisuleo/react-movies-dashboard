import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
    const { status } = error.response;
    const expectedError = status >= 400 && status < 500;

    if (!expectedError) {
        console.error("oops...UNEXPECTED ERROR");
    } else {
        toast.error(error.message);
    }

    return Promise.reject(error);
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
