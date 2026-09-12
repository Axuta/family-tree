const STORAGE_KEY = "familyTree";

export function loadPeople() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return []; // повреждённый JSON не уронит приложение
    }
}

export function savePeople(people) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
        return true;
    } catch {
        return false; // QuotaExceededError — место кончилось
    }
}