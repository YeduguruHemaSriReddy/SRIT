import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // ✅ prevents AbortError

    const loadUser = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        if (isMounted) {
          setUser(null);
          setRole(null);
          setLoading(false);
        }
        return;
      }

      const { data: userRole } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (isMounted) {
        setUser(session.user);
        setRole(userRole?.role || null);
        setLoading(false);
      }
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;

        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      isMounted = false; // ✅ THIS FIXES AbortError
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
