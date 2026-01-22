import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        // 1️⃣ Get authenticated user
        const { data: authData, error: authError } =
          await supabase.auth.getUser();

        if (authError || !authData?.user) {
          if (isMounted) {
            setUser(null);
            setRole(null);
            setLoading(false);
          }
          return;
        }

        const authUser = authData.user;

        // 2️⃣ Get role from users table
        const { data: userRow, error: userError } = await supabase
          .from("users")
          .select("role")
          .eq("id", authUser.id)
          .single();

        if (userError) {
          console.error("Role fetch error:", userError.message);
        }

        if (isMounted) {
          setUser(authUser);
          setRole(userRow?.role || null);
          setLoading(false);
        }
      } catch (err) {
        console.error("AuthContext error:", err);
        if (isMounted) setLoading(false);
      }
    };

    loadUser();

    // 3️⃣ Listen to auth changes (login / logout)
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!session?.user) {
          setUser(null);
          setRole(null);
          setLoading(false);
          return;
        }

        setUser(session.user);

        const { data: userRow } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single();

        setRole(userRow?.role || null);
        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
