import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

/* ---------- COMPONENTS ---------- */
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
import StudentLayout from "./dashboards/student/StudentLayout";
import StudentDashboard from "./dashboards/student/StudentDashboard";
import Attendance from "./dashboards/student/Attendance";
import Marks from "./dashboards/student/Marks";
import StudentMaterials from "./dashboards/student/StudentMaterials";
import StudentTimetable from "./dashboards/student/StudentTimetable";
import StudentNotices from "./dashboards/student/StudentNotices";
import StudentProfile from "./dashboards/student/StudentProfile";
import StudentGrievances from "./dashboards/student/StudentGrievances";
import StudentFees from "./dashboards/student/StudentFees";
import ExamRegistration from "./dashboards/student/ExamRegistration";
import StudentIDCard from "./dashboards/student/StudentIdCard";
/* ---------- FACULTY ---------- */
import FacultyLayout from "./dashboards/faculty/FacultyLayout";
import FacultyDashboard from "./dashboards/faculty/FacultyDashboard";
import FacultySubjects from "./dashboards/faculty/FacultySubjects";
import FacultyNotices from "./dashboards/faculty/FacultyNotices";
import FacultyAttendance from "./dashboards/faculty/FacultyAttendance";
import FacultyMaterials from "./dashboards/faculty/FacultyMaterials";
import FacultyMarks from "./dashboards/faculty/FacultyMarks";
import FacultyProfile from "./dashboards/faculty/FacultyProfile";
import FacultyTimetable from "./dashboards/faculty/FacultyTimetable";
import FacultyCertifications from "./dashboards/faculty/FacultyCertifications";
import FacultyAttendanceAnalytics from "./dashboards/faculty/FacultyAttendanceAnalytics";
import LeaveRequests from "./dashboards/faculty/LeaveRequests";
import FacultyAnnouncements from "./dashboards/faculty/FacultyAnnouncements"; 
import FacultyMarksAnalytics from "./dashboards/faculty/FacultyMarksAnalytics";
/* ---------- ADMIN ---------- */
import AdminLayout from "./dashboards/admin/AdminLayout";
import AdminDashboard from "./dashboards/admin/AdminDashboard";
import AdminStudents from "./dashboards/admin/AdminStudents";
import AdminNotices from "./dashboards/admin/AdminNotices";
import StudentAssign from "./dashboards/admin/StudentAssign";
import AdminGrievances from "./dashboards/admin/AdminGrievances";
import AdminTimetable from "./dashboards/admin/AdminTimetable";
import AdminFacultySubject from "./dashboards/admin/AdminFacultySubject";
import AdminFacultyLeaves from "./dashboards/admin/AdminFacultyLeaves";
import AdminExamControl from "./dashboards/admin/AdminExamControl";
import AdminFeeManagement from "./dashboards/admin/AdminFeeManagement";
/* ---------- PROTECTED ROUTE ---------- */
function ProtectedRoute({ children, allowedRole }) {
  const { user, role, loading } = useAuth();

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && role !== allowedRole)
    return <Navigate to="/login" replace />;

  return children;
}

/* ---------- LAYOUT ---------- */
function Layout({ children }) {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/student") ||
    location.pathname.startsWith("/faculty") ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navigation />}
      <main className={!hideNavbar ? "pt-44" : ""}>{children}</main>
    </>
  );
}

/* ---------- APP ---------- */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
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
            <Route path="/student" element={<StudentLayout />}>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="marks" element={<Marks />} />
              <Route path="materials" element={<StudentMaterials />} />
              <Route path="timetable" element={<StudentTimetable />} />
              <Route path="fees" element={<StudentFees />} />
              <Route path="notices" element={<StudentNotices />} />
              <Route path="grievances" element={<StudentGrievances />} />
              <Route path="exam-registration" element={<ExamRegistration />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="id-card" element={<StudentIDCard />} /> 
            </Route>

            {/* ===== FACULTY ===== */}
            <Route
              path="/faculty"
              element={
                <ProtectedRoute allowedRole="faculty">
                  <FacultyLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<FacultyDashboard />} />
              <Route path="subjects" element={<FacultySubjects />} />
              <Route path="notices" element={<FacultyNotices />} />
              <Route path="profile" element={<FacultyProfile />} />
              <Route path="timetable" element={<FacultyTimetable />} />
              <Route path="materials" element={<FacultyMaterials />} />
              <Route path="certifications" element={<FacultyCertifications />} />
              <Route
                path="attendance/:subjectId"
                element={<FacultyAttendance />}
              />
              <Route
                path="attendance-analytics"
                element={<FacultyAttendanceAnalytics />}
              />
              <Route path="announcements" element={<FacultyAnnouncements />} />
              <Route path="marks/:subjectId" element={<FacultyMarks />} />
              <Route path="marks-analytics" element={<FacultyMarksAnalytics />} />

              {/* ✅ LEAVE ROUTE */}
              <Route path="leave" element={<LeaveRequests />} />
            </Route>

            {/* ===== ADMIN ===== */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="students" element={<AdminStudents />} />
              <Route path="notices" element={<AdminNotices />} />
              <Route path="timetable" element={<AdminTimetable />} />
              <Route path="student-assign" element={<StudentAssign />} />
              <Route path="faculty-leaves" element={<AdminFacultyLeaves />} />
              <Route path="grievances" element={<AdminGrievances />} />
              <Route path="faculty-subject" element={<AdminFacultySubject />} />
              <Route path="exam-control" element={<AdminExamControl />} />
              <Route path="fee-management" element={<AdminFeeManagement />} />
            </Route>

            {/* ===== FALLBACK ===== */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
