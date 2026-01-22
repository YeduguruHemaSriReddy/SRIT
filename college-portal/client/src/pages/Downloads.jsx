import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import { supabase } from "../services/supabase";
import { Download as DownloadIcon, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Download() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    const { data, error } = await supabase
      .from("downloads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error.message);
    } else {
      setDownloads(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ================= HERO ================= */}
      <section className="pt-32 pb-20 bg-gray-50 text-center">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Downloads
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access important documents, circulars, forms, and academic resources.
          </p>
        </div>
      </section>

      {/* ================= DOWNLOAD LIST ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Available Downloads"
            subtitle="Documents & Resources"
            centered
          />

          {loading ? (
            <p className="text-center text-gray-500 mt-10">Loading downloads...</p>
          ) : downloads.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No documents available right now.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {downloads.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                    <h3 className="font-bold text-lg">{file.title}</h3>
                  </div>

                  <p className="text-sm text-gray-600 mb-6">
                    Target: <b>{file.target_role || "All"}</b>
                  </p>

                  <a
                    href={file.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                  >
                    <DownloadIcon className="w-5 h-5" />
                    Download File
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
