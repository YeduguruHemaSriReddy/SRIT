import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function ExamRegistration() {
  const [subjects, setSubjects] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    const { data: window } = await supabase
      .from("exam_windows")
      .select("*")
      .eq("semester", 1)
      .single();

    if (!window || !window.is_open) {
      setOpen(false);
      setLoading(false);
      return;
    }

    setOpen(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    const { data: studentSubjects } = await supabase
      .from("student_subjects")
      .select("subject_id, subjects(name)")
      .eq("student_id", student.id);

    const { data: regs } = await supabase
      .from("exam_registrations")
      .select("subject_id")
      .eq("student_id", student.id)
      .eq("semester", 1);

    setRegistered(regs?.map((r) => r.subject_id) || []);
    setSubjects(studentSubjects || []);
    setLoading(false);
  };

  const registerExam = async (subjectId) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: student } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", user.id)
      .single();

    await supabase.from("exam_registrations").insert({
      student_id: student.id,
      subject_id: subjectId,
      semester: 1,
    });

    loadData();
  };

  if (loading) return <p className="p-6">Loading...</p>;

  if (!open)
    return (
      <div className="p-6 bg-yellow-50 border rounded">
        Exam registration is currently closed
      </div>
    );

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Exam Registration
      </h2>

      {subjects.map((s) => (
        <div
          key={s.subject_id}
          className="flex justify-between items-center border p-2 mb-2 rounded"
        >
          <span>{s.subjects.name}</span>

          {registered.includes(s.subject_id) ? (
            <span className="text-green-600 font-medium">
              Registered
            </span>
          ) : (
            <button
              onClick={() => registerExam(s.subject_id)}
              className="bg-emerald-600 text-white px-3 py-1 rounded"
            >
              Register
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
