import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSpin } from "../providers/SpinnerProvider";
const useAxios = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(url);
        if (isMounted) {
          setData(response.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};

export default useAxios;
