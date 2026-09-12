import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import { loadPeople, savePeople } from "./utils/storage";

function App() {
    const [people, setPeople] = useState(loadPeople);

    const addPerson = (person) => {
        const updated = [...people, person];
        if (savePeople(updated)) {
            setPeople(updated);
        } else {
            alert("Failed to save: storage limit reached");
        }
    };

    return (
        <div className="app">
            <h1 className="app-title">Family Tree</h1>
            <PersonForm onSave={addPerson} />
            <p>Added so far: {people.length}</p>
        </div>
    );
}

export default App;