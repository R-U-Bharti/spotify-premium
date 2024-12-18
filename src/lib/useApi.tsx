import { useEffect, useState } from "react";
import AxiosInterceptors from "./AxiosInterceptor";
import ApiHeader from "./ApiHeader";
import { toast } from "sonner";

export default function useApi(api: string, method: string, body?: any) {

    const [data, setData] = useState<any>(null)
    const [loader, setLoader] = useState<boolean>(false)

    console.log(ApiHeader())

    useEffect(() => {
        setLoader(true)
        async function axiosResponse(method = 'get', body = {}) {
            if (method == 'post') {
                return await AxiosInterceptors.post(api, body, ApiHeader())
            } else {
                return await AxiosInterceptors.get(api, ApiHeader())
            }
        }

        axiosResponse(method, body)
            .then((res) => setData(res?.data ?? null))
            .catch((err) => toast.error(err?.response?.data?.error?.message ?? "Please try again later."))
            .finally(() => setLoader(false))
    }, [api, method, body])

    return { loader, data }
}