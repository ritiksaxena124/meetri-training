import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../utils/axios";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyAuth() {
      try {
        await client.get("auth/verify-auth");
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        navigate("/login");
      }
    }
    verifyAuth();
  }, []);

  if (isAuthenticated) {
    return children;
  }
};

export default ProtectedRoute;
