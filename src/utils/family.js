/*
  Person = {
    id: string,            // crypto.randomUUID()
    firstName: "",
    lastName: "",
    birthYear: number | null,
    deathYear: number | null,  // null = жив(а)
    gender: "m" | "f",
    photo: string | null,      // base64 data URL или null
    bio: "",                   // биография
    notes: "",                 // заметки
    fatherId: string | null,
    motherId: string | null,
    spouseIds: string[]        // массив id супругов
  }
*/