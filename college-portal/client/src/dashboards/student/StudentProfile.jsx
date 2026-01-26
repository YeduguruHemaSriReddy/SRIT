import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    phone: "",
    address: "",
    bio: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("students")
      .select(
        "id, roll_number, department, year, phone, address, bio"
      )
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    if (!data) {
      // No profile yet
      setProfile(null);
      setLoading(false);
      return;
    }

    setProfile(data);
    setForm({
      phone: data.phone || "",
      address: data.address || "",
      bio: data.bio || "",
    });

    setLoading(false);
  };

  const saveProfile = async () => {
    setSaving(true);

    const { error } = await supabase
      .from("students")
      .update(form)
      .eq("id", profile.id);

    if (error) {
      alert("Failed to update profile");
    } else {
      alert("Profile updated successfully");
      setEditMode(false);
      loadProfile();
    }

    setSaving(false);
  };

  if (loading) {
    return <p className="p-6">Loading profile...</p>;
  }

  if (!profile) {
    return (
      <div className="p-6">
        <p className="text-gray-500">
          No profile found. Please contact admin.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">
        My Profile
      </h1>

      {/* VIEW MODE */}
      {!editMode && (
        <div className="space-y-2">
          <p><b>Roll No:</b> {profile.roll_number}</p>
          <p><b>Department:</b> {profile.department}</p>
          <p><b>Year:</b> {profile.year}</p>
          <p><b>Phone:</b> {profile.phone || "-"}</p>
          <p><b>Address:</b> {profile.address || "-"}</p>
          <p><b>About:</b> {profile.bio || "-"}</p>

          <button
            onClick={() => setEditMode(true)}
            className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* EDIT MODE */}
      {editMode && (
        <div className="space-y-3">
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          />

          <input
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            placeholder="About you"
            value={form.bio}
            onChange={(e) =>
              setForm({ ...form, bio: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex gap-3">
            <button
              onClick={saveProfile}
              disabled={saving}
              className="bg-emerald-600 text-white px-5 py-2 rounded"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-300 px-5 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
