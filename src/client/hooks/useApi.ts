import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_HOST ?? ""}`;

const useAPI = <T>(url: string, options: AxiosRequestConfig) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);

  const fetchData = () => {
    axios(url, options)
      .then((res) => {
        setData(res.data as T);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, data, error, fetchData };
};

export default useAPI;
