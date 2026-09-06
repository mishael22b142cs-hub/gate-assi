import React, { useState } from 'react';
import { BRANCH_LABELS, YEAR_LABELS, BRANCH_OPTIONS, YEAR_OPTIONS } from '../../lib/studentMeta';

const Row = ({ label, value }) => (
    <div>
        <label className="block text-gray-700">{label}:</label>
        <p className="text-gray-900 font-semibold">{value || <span className="text-gray-400 font-normal">Not set</span>}</p>
    </div>
);

const DashboardProfile = ({ student, onUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        name: student.name || '',
        phoneno: student.phoneno || '',
        collegeName: student.collegeName || '',
        branch: student.branch || '',
        yearOfStudy: student.yearOfStudy || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const startEditing = () => {
        setForm({
            name: student.name || '',
            phoneno: student.phoneno || '',
            collegeName: student.collegeName || '',
            branch: student.branch || '',
            yearOfStudy: student.yearOfStudy || '',
        });
        setError('');
        setEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSaving(true);
        try {
            const data = await onUpdate(form);
            if (data?.success) {
                setEditing(false);
            } else {
                setError(data?.message || 'Could not save your profile');
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Could not save your profile');
        } finally {
            setSaving(false);
        }
    };

    if (editing) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Profile</h2>
                {error && (
                    <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full minimal-input"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneno"
                            value={form.phoneno}
                            onChange={handleChange}
                            className="w-full minimal-input"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">College Name</label>
                        <input
                            type="text"
                            name="collegeName"
                            value={form.collegeName}
                            onChange={handleChange}
                            className="w-full minimal-input"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Branch</label>
                        <select
                            name="branch"
                            value={form.branch}
                            onChange={handleChange}
                            className="w-full minimal-input"
                        >
                            <option value="">Select your branch</option>
                            {BRANCH_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Year of Study</label>
                        <select
                            name="yearOfStudy"
                            value={form.yearOfStudy}
                            onChange={handleChange}
                            className="w-full minimal-input"
                        >
                            <option value="">Select your year</option>
                            {YEAR_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-60"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Your Profile</h2>
                <button
                    onClick={startEditing}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Edit Profile
                </button>
            </div>
            <div className="space-y-4">
                <Row label="Full Name" value={student.name} />
                <Row label="Email" value={student.email} />
                <Row label="Phone Number" value={student.phoneno} />
                <Row label="College" value={student.collegeName} />
                <Row label="Branch" value={BRANCH_LABELS[student.branch] || student.branch} />
                <Row label="Year of Study" value={YEAR_LABELS[student.yearOfStudy] || student.yearOfStudy} />
            </div>
        </div>
    );
};

export default DashboardProfile;
