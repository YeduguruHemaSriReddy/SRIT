import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async (session) => {
    if (!session?.user) {
      setUser(null);
      setRole(null);
      setLoading(false);
      return;
    }

    setUser(session.user);

    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (!error && data?.role) {
      setRole(data.role);
    } else {
      setRole(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    // Initial session
    supabase.auth.getSession().then(({ data }) => {
      loadUser(data.session);
    });

    // Auth change listener
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        loadUser(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
