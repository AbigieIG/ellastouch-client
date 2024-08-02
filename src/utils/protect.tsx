import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AdminType {
  user: {
    admin: boolean;
  };
}
export const UserRouther = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);
  return children;
};

export const AdminRouter = ({ children }: { children: ReactNode }) => {
  const [admin] = useState<AdminType>(() => {
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : {};
  });

  const navigate = useNavigate();


  useEffect(() => {
    if (!admin) {
      navigate("/notfound");
    }
  }, [navigate, admin]);

  return <>{children}</>;
};

export const ProtectedRouter = ({ children }: { children: ReactNode }) => {
  const active = localStorage.getItem("booking");
  const navigate = useNavigate();

  useEffect(() => {
    if (!active) {
      navigate("/");
    }
  }, [active, navigate]);

  return children;
};

export const LoginRouther = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  return children;
};
