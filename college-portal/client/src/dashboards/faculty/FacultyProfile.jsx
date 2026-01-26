import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function FacultyProfile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    qualification: "",
    experience: "",
    office_room: "",
    bio: "",
  });

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
      .from("faculty")
      .select(`
        id,
        name,
        department,
        designation,
        phone,
        qualification,
        experience,
        office_room,
        bio
      `)
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    if (data) {
      setProfile(data);
      setForm({
        phone: data.phone || "",
        qualification: data.qualification || "",
        experience: data.experience || "",
        office_room: data.office_room || "",
        bio: data.bio || "",
      });
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    if (!profile) return;

    setSaving(true);

    const { error } = await supabase
      .from("faculty")
      .update({
        phone: form.phone,
        qualification: form.qualification,
        experience: form.experience,
        office_room: form.office_room,
        bio: form.bio,
      })
      .eq("id", profile.id);

    if (error) {
      alert("Failed to update profile");
      console.error(error);
    } else {
      alert("Profile updated successfully");
      setEditMode(false);
      loadProfile();
    }

    setSaving(false);
  };

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>No faculty profile found.</p>;

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">My Profile</h2>

      {/* ===== READ-ONLY SECTION (ADMIN CONTROLLED) ===== */}
      <div className="space-y-1 text-sm">
        <p><b>Name:</b> {profile.name}</p>
        <p><b>Department:</b> {profile.department}</p>
        <p><b>Designation:</b> {profile.designation}</p>
      </div>

      <hr />

      {/* ===== VIEW MODE ===== */}
      {!editMode && (
        <div className="space-y-2 text-sm">
          <p><b>Phone:</b> {profile.phone || "-"}</p>
          <p><b>Qualification:</b> {profile.qualification || "-"}</p>
          <p><b>Experience:</b> {profile.experience || 0} years</p>
          <p><b>Office Room:</b> {profile.office_room || "-"}</p>
          <p><b>About:</b> {profile.bio || "-"}</p>

          <button
            onClick={() => setEditMode(true)}
            className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* ===== EDIT MODE ===== */}
      {editMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phone */}
          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Qualification */}
          <div>
            <label className="text-sm font-medium">Qualification</label>
            <input
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="text-sm font-medium">
              Experience (years)
            </label>
            <input
              name="experience"
              type="number"
              value={form.experience}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Office Room */}
          <div>
            <label className="text-sm font-medium">Office Room</label>
            <input
              name="office_room"
              value={form.office_room}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Bio */}
          <div className="col-span-2">
            <label className="text-sm font-medium">About</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="col-span-2 flex gap-3 mt-4">
            <button
              onClick={saveProfile}
              disabled={saving}
              className="bg-emerald-600 text-white px-6 py-2 rounded"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-300 px-6 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
