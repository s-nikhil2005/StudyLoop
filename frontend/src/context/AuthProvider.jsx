import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getCurrentUser } from "../services/userService";

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUser = async () => {
      const res = await getCurrentUser();

      if (res && res.user) {
        setUser(res.user);
      }

      setLoading(false);
    };

    fetchUser();

  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;