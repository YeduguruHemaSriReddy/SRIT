import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Navigation from "./components/Navigation";

/* ---------- PUBLIC PAGES ---------- */
import Home from "./pages/Home";
import About from "./pages/About";
import Admissions from "./pages/Admissions";
import Departments from "./pages/Departments";
import CampusLife from "./pages/CampusLife";
import Placements from "./pages/Placements";
import Contact from "./pages/Contact";

/* ---------- AUTH ---------- */
import Login from "./auth/Login";

/* ---------- STUDENT ---------- */
import StudentDashboard from "./dashboards/student/StudentDashboard";
import StudentNotices from "./dashboards/student/StudentNotices";
import StudentDownloads from "./dashboards/student/StudentDownloads";
import StudentGrievances from "./dashboards/student/StudentGrievances";

/* ---------- FACULTY ---------- */
import FacultyDashboard from "./dashboards/faculty/FacultyDashboard";
import FacultyNotices from "./dashboards/faculty/FacultyNotices";
import FacultyDownloads from "./dashboards/faculty/FacultyDownloads";

/* ---------- ADMIN ---------- */
import AdminDashboard from "./dashboards/admin/AdminDashboard";
import AdminNotices from "./dashboards/admin/AdminNotices";
import AdminGrievances from "./dashboards/admin/AdminGrievances";

/* ---------- PROTECTED ROUTE ---------- */
function ProtectedRoute({ children, allowedRole }) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

/* ---------- APP ---------- */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />

        {/* FIX: space for fixed navbar */}
        <main className="pt-44 relative z-10">
          <Routes>
            {/* ===== PUBLIC ===== */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/campus-life" element={<CampusLife />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            {/* ===== STUDENT ===== */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/notices"
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentNotices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/downloads"
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentDownloads />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/grievances"
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentGrievances />
                </ProtectedRoute>
              }
            />

            {/* ===== FACULTY ===== */}
            <Route
              path="/faculty"
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty/notices"
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyNotices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty/downloads"
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyDownloads />
                </ProtectedRoute>
              }
            />

            {/* ===== ADMIN ===== */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notices"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminNotices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/grievances"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminGrievances />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
