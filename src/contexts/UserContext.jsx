import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../services/supabaseClient";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
      }
      setUser(data?.session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="col-span-full flex justify-center items-center h-32">
        <p className="text-gray-600 font-medium text-xl">⏳Authenticating...</p>
      </div>
    );
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
