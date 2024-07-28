
import { useState, useEffect } from 'react';
import  { AxiosResponse, isAxiosError } from 'axios';
import apiClient from './axios';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response: AxiosResponse = await apiClient.get("/users/data", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (err) {
        if(isAxiosError(err)) { 
          setError(err?.response?.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export { useAuth };
