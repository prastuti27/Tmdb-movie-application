import { useState, useEffect } from "react";
import api from "./api";

interface FetchResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  postData?: (body: object) => Promise<T>;
  deleteData?: () => Promise<void>;
}

const useApiCall = <T,>(
  endpoint: string,
  method: "GET" | "POST" | "DELETE" = "GET"
): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (method === "GET") {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await api.get(endpoint);
          setData(response.data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
          setError("Failed to fetch data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [endpoint, method]);

  const postData = async (body: object): Promise<T> => {
    setLoading(true);
    try {
      const response = await api.post(endpoint, body);
      setData(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to post data:", error);
      setError("Failed to post data. Please try again later.");
      throw error; // Ensure to throw the error so it can be caught in the component
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async () => {
    setLoading(true);
    try {
      await api.delete(endpoint);
      setData(null);
    } catch (error) {
      console.error("Failed to delete data:", error);
      setError("Failed to delete data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postData, deleteData };
};

export default useApiCall;
