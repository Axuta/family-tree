function PersonCard({ person }) {
    const initials = `${person.firstName[0] ?? ""}${person.lastName[0] ?? ""}`.toUpperCase();

    return (
        <div className="person-card">
            {person.photo ? (
                <img src={person.photo} alt={person.firstName} className="person-photo" />
            ) : (
                <div className={`person-photo person-initials ${person.gender === "f" ? "female" : ""}`}>
                    {initials || "?"}
                </div>
            )}
            <div className="person-info">
                <strong>
                    {person.firstName} {person.lastName}
                </strong>
                <span>
          {person.birthYear ?? "—"}{person.deathYear ? ` – ${person.deathYear}` : ""}
        </span>
            </div>
        </div>
    );
}

export default PersonCard;