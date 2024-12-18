import axios from 'axios';
import { toast } from 'sonner';
import qs from 'qs'

const AxiosInterceptors = axios.create();

const takeAction = () => {
    toast.error("Unauthorized!! Login Again.")
    localStorage.clear()
    window.location.href = '/'
}

const refreshToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const url = "https://accounts.spotify.com/api/token";

    let body = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET_ID,
    }

    axios.post(url, qs.stringify(body), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((res) => {
        localStorage.setItem('token', res?.data?.accessToken);
        if (res?.data?.refreshToken) {
            localStorage.setItem('refreshToken', res?.data?.refreshToken);
        }
    }).catch(() => takeAction())
}

AxiosInterceptors.interceptors.response.use(
    (response) => {
        if (response?.status === 401) {
            refreshToken()
        }

        console.log('%c🚀=========================END===============================🚀', 'width: 100%; height: 2px; color: lightgreen;')
        console.log('\n\n')

        return response;
    },
    (error) => {
        console.log(`%cAxios interceptor got API error ${error?.response?.status || ""}`, "color: red; background-color: black; border: 1px solid red; padding: 4px 6px")
        console.log("Here it is:", error)
        console.log('%c🚀=========================END===============================🚀', 'width: 100%; height: 2px; color: red;')
        console.log('\n\n')
        if (error?.response && error?.response?.status === 401) {
            refreshToken()
        }
        return Promise.reject(error);
    }
);

export default AxiosInterceptors