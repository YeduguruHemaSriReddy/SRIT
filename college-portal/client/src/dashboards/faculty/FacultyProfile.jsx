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

  if (loading) return <p className="p-6">Loading profile...</p>;
  if (!profile) return <p className="p-6 text-red-600">No faculty profile found</p>;

  return (
    <div className="p-6 max-w-3xl">
      <div className="bg-white rounded-xl shadow border p-6">

        {/* ===== HEADER ===== */}
        <h1 className="text-2xl font-semibold mb-1">My Profile</h1>
        <p className="text-sm text-gray-500 mb-4">
          Professional information visible to students and administration
        </p>

        {/* ===== ADMIN CONTROLLED DETAILS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">{profile.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Department</p>
            <p className="font-medium">{profile.department}</p>
          </div>

          <div>
            <p className="text-gray-500">Designation</p>
            <p className="font-medium">{profile.designation}</p>
          </div>
        </div>

        <hr className="my-5" />

        {/* ===== VIEW MODE ===== */}
        {!editMode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">{profile.phone || "-"}</p>
            </div>

            <div>
              <p className="text-gray-500">Qualification</p>
              <p className="font-medium">{profile.qualification || "-"}</p>
            </div>

            <div>
              <p className="text-gray-500">Experience</p>
              <p className="font-medium">
                {profile.experience ? `${profile.experience} years` : "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Office Room</p>
              <p className="font-medium">{profile.office_room || "-"}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-500">About</p>
              <p className="font-medium">{profile.bio || "-"}</p>
            </div>

            <div className="md:col-span-2 mt-4">
              <button
                onClick={() => setEditMode(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}

        {/* ===== EDIT MODE ===== */}
        {editMode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="text-gray-600">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="text-gray-600">Qualification</label>
              <input
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="text-gray-600">Experience (years)</label>
              <input
                type="number"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="text-gray-600">Office Room</label>
              <input
                name="office_room"
                value={form.office_room}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-600">About</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="md:col-span-2 flex gap-3 mt-4">
              <button
                onClick={saveProfile}
                disabled={saving}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-300 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
