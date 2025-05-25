import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const login = useCallback((token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    client.resetStore();
    navigate("/");
  }, [client, navigate]);

  return { isAuthenticated, isLoading, login, logout };
};

export default useAuth;
