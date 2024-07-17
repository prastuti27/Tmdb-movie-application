import { useState, useEffect } from "react";
import api from "./api";

interface FetchResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  postData?: (body: object) => Promise<void>;
  deleteData?: () => Promise<void>;
}

const useApiCall = <T,>(
  endpoint: string,
  method: "GET" | "POST" | "DELETE" = "GET",
  options = {}
): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (method === "GET") {
      const fetchData = async () => {
        try {
          const response = await api.get(endpoint, options);
          setData(response.data);
        } catch (error) {
          setError("Failed to fetch data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [endpoint, method, options]);

  const postData = async (body: object) => {
    setLoading(true);
    try {
      const response = await api.post(endpoint, body, options);
      setData(response.data);
    } catch (error) {
      setError("Failed to post data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async () => {
    setLoading(true);
    try {
      await api.delete(endpoint, options);
      setData(null);
    } catch (error) {
      setError("Failed to delete data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postData, deleteData };
};

export default useApiCall;
