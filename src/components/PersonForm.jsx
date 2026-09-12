import { useState } from "react";
import { resizeImage } from "../utils/image";

function PersonForm({ onSave, editingPerson, onUpdate, onCancelEdit }) {
    const [firstName, setFirstName] = useState(editingPerson?.firstName ?? "");
    const [lastName, setLastName] = useState(editingPerson?.lastName ?? "");
    const [birthYear, setBirthYear] = useState(editingPerson?.birthYear ?? "");
    const [deathYear, setDeathYear] = useState(editingPerson?.deathYear ?? "");
    const [gender, setGender] = useState(editingPerson?.gender ?? "m");
    const [bio, setBio] = useState(editingPerson?.bio ?? "");
    const [notes, setNotes] = useState(editingPerson?.notes ?? "");
    const [photo, setPhoto] = useState(editingPerson?.photo ?? null);
    const [error, setError] = useState("");
    const [photoStatus, setPhotoStatus] = useState("");

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setBirthYear("");
        setDeathYear("");
        setBio("");
        setNotes("");
        setPhoto(null);
        setPhotoStatus("");
        setError("");
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPhotoStatus("loading");
        try {
            const resized = await resizeImage(file);
            setPhoto(resized);
            setPhotoStatus("");
        } catch {
            setPhotoStatus("error");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!firstName.trim()) {
            setError("First name is required");
            return;
        }

        const parsedBirth = birthYear === "" ? null : Number(birthYear);
        const parsedDeath = deathYear === "" ? null : Number(deathYear);

        if (parsedBirth && parsedDeath && parsedDeath < parsedBirth) {
            setError("Death year cannot be earlier than birth year");
            return;
        }

        if (editingPerson) {
            onUpdate({
                ...editingPerson,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                birthYear: parsedBirth,
                deathYear: parsedDeath,
                gender,
                bio: bio.trim(),
                notes: notes.trim(),
                photo,
            });
        } else {
            onSave({
                id: crypto.randomUUID(),
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                birthYear: parsedBirth,
                deathYear: parsedDeath,
                gender,
                bio: bio.trim(),
                notes: notes.trim(),
                photo,
                fatherId: null,
                motherId: null,
                spouseIds: [],
            });
        }

        resetForm();
    };

    return (
        <form onSubmit={handleSubmit} className="person-form">
            <h2>{editingPerson ? "Edit Person" : "Add Person"}</h2>

            <div className="form-row">
                <input
                    type="text"
                    placeholder="First name *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <div className="form-row">
                <input
                    type="number"
                    placeholder="Birth year"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Death year (empty if alive)"
                    value={deathYear}
                    onChange={(e) => setDeathYear(e.target.value)}
                />
            </div>

            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="m">Male</option>
                <option value="f">Female</option>
            </select>

            <label className="photo-label">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="photo-input"
                />
                {photo ? (
                    <img src={photo} alt="Preview" className="photo-preview" />
                ) : (
                    <span className="photo-placeholder">+ Photo</span>
                )}
            </label>
            {photoStatus === "loading" && <p className="status">Processing photo…</p>}
            {photoStatus === "error" && <p className="error">Could not load image</p>}

            <textarea
                placeholder="Biography"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
            />

            <textarea
                placeholder="Notes (personal memories, hobbies…)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">{editingPerson ? "Save" : "Add"}</button>
            {editingPerson && (
                <button type="button" onClick={onCancelEdit}>
                    Cancel
                </button>
            )}
        </form>
    );
}

export default PersonForm;