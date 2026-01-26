import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function StudentDownloads() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("downloads")
      .select("id, title, file_url, category, created_at")
      .in("target_role", ["student", "all"])
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch downloads:", error);
      setDownloads([]);
    } else {
      setDownloads(data || []);
    }

    setLoading(false);
  };

  if (loading) {
    return <p className="p-6">Loading downloads...</p>;
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-semibold mb-4">📁 Downloads</h1>

      {downloads.length === 0 ? (
        <p className="text-gray-500">No files available</p>
      ) : (
        <div className="space-y-4">
          {downloads.map((file) => (
            <div
              key={file.id}
              className="bg-white shadow p-4 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{file.title}</h3>
                <p className="text-sm text-gray-500">
                  {file.category || "General"} •{" "}
                  {new Date(file.created_at).toLocaleDateString()}
                </p>
              </div>

              <a
                href={file.file_url}
                target="_blank"
                rel="noreferrer"
                className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
