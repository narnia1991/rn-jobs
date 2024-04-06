import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = ({ params, endpoint = 'search' }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultOptions = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    params,
  };

  const fetchData = async (options) => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error) {
      setError(error);
      alert('Something went wrong', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(defaultOptions);
  }, []);

  const refetch = () => {
    fetchData(defaultOptions);
  };

  const dynamicFetch = (options) => {
    const newOptions = { ...defaultOptions, ...options };
    fetchData(newOptions);
  };

  return {
    data,
    isLoading,
    error,
    refetch,
    dynamicFetch,
  };
};

export default useFetch;
