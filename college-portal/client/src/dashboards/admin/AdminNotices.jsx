import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function AdminNotices() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState("student");
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const { data } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    setNotices(data || []);
  };

  const publishNotice = async () => {
    if (!title || !content) {
      alert("Title & content required");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("notices").insert({
      title,
      content,
      audience,
      created_by: user.id,
    });

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setTitle("");
    setContent("");
    fetchNotices();
  };

  const deleteNotice = async (id) => {
    await supabase.from("notices").delete().eq("id", id);
    fetchNotices();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Admin Notices</h1>

      <div className="border p-4 rounded mb-6">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Notice content"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          className="border p-2 mb-2"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        >
          <option value="student">Students</option>
          <option value="faculty">Faculty</option>
          <option value="both">Both</option>
        </select>

        <br />
        <button
          onClick={publishNotice}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Publish
        </button>
      </div>

      {notices.map((n) => (
        <div key={n.id} className="border p-3 rounded mb-2">
          <h3 className="font-semibold">{n.title}</h3>
          <p>{n.content}</p>
          <small className="text-gray-500">
            {n.audience} • {new Date(n.created_at).toLocaleString()}
          </small>
          <br />
          <button
            onClick={() => deleteNotice(n.id)}
            className="text-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
