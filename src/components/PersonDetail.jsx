function PersonDetail({ person, onClose, onEdit, onDelete }) {
    return (
        <div className="person-detail">
            <div className="detail-header">
                {person.photo ? (
                    <img src={person.photo} alt={person.firstName} className="detail-photo" />
                ) : (
                    <div className="person-photo person-initials">
                        {person.firstName[0]?.toUpperCase()}
                    </div>
                )}
                <h2>
                    {person.firstName} {person.lastName}
                </h2>
            </div>

            <p className="detail-years">
                {person.birthYear ?? "—"}
                {person.deathYear ? ` – ${person.deathYear}` : " (alive)"}
            </p>

            {person.bio && (
                <section>
                    <h3>Biography</h3>
                    <p>{person.bio}</p>
                </section>
            )}

            {person.notes && (
                <section>
                    <h3>Notes</h3>
                    <p>{person.notes}</p>
                </section>
            )}

            <div className="detail-actions">
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete}>Delete</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default PersonDetail;