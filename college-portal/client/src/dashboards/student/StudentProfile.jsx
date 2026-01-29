import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    address: "",
    dob: "",
    gender: "",
    blood_group: "",
    father_name: "",
    father_phone: "",
    mother_name: "",
    parent_income: "",
    eamcet_rank: "",
    eamcet_hallticket: "",
    bio: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("students")
      .select(`
        id,
        roll_number,
        department,
        year,
        phone,
        address,
        dob,
        gender,
        blood_group,
        father_name,
        father_phone,
        mother_name,
        parent_income,
        eamcet_rank,
        eamcet_hallticket,
        bio
      `)
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setProfile(data);
    setForm({
      phone: data.phone || "",
      address: data.address || "",
      dob: data.dob || "",
      gender: data.gender || "",
      blood_group: data.blood_group || "",
      father_name: data.father_name || "",
      father_phone: data.father_phone || "",
      mother_name: data.mother_name || "",
      parent_income: data.parent_income || "",
      eamcet_rank: data.eamcet_rank || "",
      eamcet_hallticket: data.eamcet_hallticket || "",
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

  if (loading) return <p className="p-6">Loading profile...</p>;
  if (!profile) return <p className="p-6 text-red-600">Profile not found</p>;

  const Row = ({ label, value }) => (
    <div className="grid grid-cols-3 gap-4 py-2 border-b text-sm">
      <div className="text-gray-500">{label}</div>
      <div className="col-span-2 font-medium text-gray-900">
        {value || "-"}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl">
      <div className="bg-white rounded-xl shadow border p-6">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold mb-1">My Profile</h1>
        <p className="text-sm text-gray-500 mb-6">
          Academic and personal information maintained by the institute
        </p>

        {/* ===== VIEW MODE ===== */}
        {!editMode && (
          <>
            {/* ACADEMIC */}
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 text-indigo-600">
                Academic Details
              </h2>
              <Row label="Roll Number" value={profile.roll_number} />
              <Row label="Department" value={profile.department} />
              <Row label="Year" value={profile.year} />
            </section>

            {/* PERSONAL */}
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 text-indigo-600">
                Personal Details
              </h2>
              <Row label="Phone" value={profile.phone} />
              <Row label="Address" value={profile.address} />
              <Row label="Date of Birth" value={profile.dob} />
              <Row label="Gender" value={profile.gender} />
              <Row label="Blood Group" value={profile.blood_group} />
            </section>

            {/* FAMILY */}
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 text-indigo-600">
                Family Details
              </h2>
              <Row label="Father Name" value={profile.father_name} />
              <Row label="Father Phone" value={profile.father_phone} />
              <Row label="Mother Name" value={profile.mother_name} />
              <Row label="Annual Income" value={profile.parent_income} />
            </section>

            {/* ENTRANCE */}
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 text-indigo-600">
                Entrance Examination
              </h2>
              <Row label="EAMCET Rank" value={profile.eamcet_rank} />
              <Row label="EAMCET Hall Ticket" value={profile.eamcet_hallticket} />
            </section>

            {/* ABOUT */}
            <section>
              <h2 className="text-lg font-semibold mb-3 text-indigo-600">
                About
              </h2>
              <p className="text-sm text-gray-800">
                {profile.bio || "-"}
              </p>
            </section>

            <button
              onClick={() => setEditMode(true)}
              className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          </>
        )}

        {/* ===== EDIT MODE ===== */}
        {editMode && (
          <>
            <h2 className="text-lg font-semibold mb-4 text-indigo-600">
              Edit Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {Object.entries(form).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-gray-600 mb-1">
                    {key.replaceAll("_", " ").toUpperCase()}
                  </label>
                  <input
                    value={value}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
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
          </>
        )}
      </div>
    </div>
  );
}
