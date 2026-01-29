import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function ExamRegistration() {
  const [subjects, setSubjects] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setMessage("");

    /* ---------- EXAM WINDOW ---------- */
    const { data: window } = await supabase
      .from("exam_windows")
      .select("*")
      .eq("semester", 1)
      .maybeSingle();

    if (!window || !window.is_open) {
      setIsOpen(false);
      setLoading(false);
      return;
    }

    setIsOpen(true);

    /* ---------- AUTH ---------- */
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("User not logged in");
      setLoading(false);
      return;
    }

    /* ---------- STUDENT ---------- */
    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) {
      setMessage("Student profile not found");
      setLoading(false);
      return;
    }

    /* ---------- SUBJECTS ---------- */
    const { data: studentSubjects } = await supabase
      .from("student_subjects")
      .select("subject_id, subjects(name)")
      .eq("student_id", student.id);

    /* ---------- REGISTERED EXAMS ---------- */
    const { data: regs } = await supabase
      .from("exam_registrations")
      .select("subject_id")
      .eq("student_id", student.id)
      .eq("semester", 1);

    setRegistered(regs?.map((r) => r.subject_id) || []);
    setSubjects(studentSubjects || []);
    setLoading(false);
  };

  /* ---------- REGISTER ---------- */
  const registerExam = async (subjectId) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!student) return;

    await supabase.from("exam_registrations").insert({
      student_id: student.id,
      subject_id: subjectId,
      semester: 1,
    });

    loadData();
  };

  /* ---------- UI STATES ---------- */
  if (loading) {
    return (
      <p className="p-6 text-gray-500">
        Loading exam registration...
      </p>
    );
  }

  if (!isOpen) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-300 rounded">
        <h2 className="font-semibold text-lg mb-1">
          Exam Registration Closed
        </h2>
        <p className="text-sm text-gray-700">
          Exam registration is currently closed. Please check notices for updates.
        </p>
      </div>
    );
  }

  if (message) {
    return (
      <div className="p-6 bg-red-50 border border-red-300 rounded">
        {message}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-2xl font-semibold">
          Exam Registration
        </h2>

        <p className="text-sm text-gray-600">
          Select subjects you want to appear for in this semester.
        </p>

        {subjects.length === 0 ? (
          <p className="text-gray-500">
            No subjects available.
          </p>
        ) : (
          <div className="space-y-3">
            {subjects.map((s) => (
              <div
                key={s.subject_id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <span className="font-medium">
                  {s.subjects.name}
                </span>

                {registered.includes(s.subject_id) ? (
                  <span className="text-green-600 font-medium">
                    ✔ Registered
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      registerExam(s.subject_id)
                    }
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded text-sm"
                  >
                    Register
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
