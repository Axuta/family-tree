import { useState } from "react";
import PersonForm from "./components/PersonForm";
import PersonCard from "./components/PersonCard";
import PersonDetail from "./components/PersonDetail";
import { loadPeople, savePeople } from "./utils/storage";

function App() {
    const [people, setPeople] = useState(loadPeople);
    const [selectedId, setSelectedId] = useState(null);
    const [editingPerson, setEditingPerson] = useState(null);

    const selected = people.find((p) => p.id === selectedId) ?? null;

    const persistAndSet = (updated, onSuccess) => {
        if (savePeople(updated)) {
            setPeople(updated);
            onSuccess?.();
            return true;
        }
        alert("Failed to save: storage limit reached");
        return false;
    };

    const addPerson = (person) => persistAndSet([...people, person]);

    const updatePerson = (updatedPerson) =>
        persistAndSet(
            people.map((p) => (p.id === updatedPerson.id ? updatedPerson : p)),
            () => setEditingPerson(null)
        );

    const deletePerson = (id) =>
        persistAndSet(people.filter((p) => p.id !== id), () => setSelectedId(null));

    return (
        <div className="app">
            <h1 className="app-title">Family Tree</h1>
            <PersonForm
                onSave={addPerson}
                editingPerson={editingPerson}
                onUpdate={updatePerson}
                onCancelEdit={() => setEditingPerson(null)}
            />

            {selected ? (
                <PersonDetail
                    person={selected}
                    onClose={() => setSelectedId(null)}
                    onEdit={() => setEditingPerson(selected)}
                    onDelete={() => deletePerson(selected.id)}
                />
            ) : (
                <>
                    {people.length === 0 ? (
                        <p className="status">No people yet</p>
                    ) : (
                        <div className="people-list">
                            {people.map((person) => (
                                <PersonCard
                                    key={person.id}
                                    person={person}
                                    onSelect={(p) => setSelectedId(p.id)}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default App;