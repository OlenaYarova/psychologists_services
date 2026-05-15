"use client";

import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "../../lib/firebase";
import { Psychologist } from "../../types/psychologist";

export default function PsychologistsPage() {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    async function loadPsychologists() {
      try {
        const snapshot = await get(ref(database, "psychologists"));

        if (!snapshot.exists()) {
          setStatus("No psychologists found");
          return;
        }

        const data = snapshot.val();

        const items: Psychologist[] = Array.isArray(data)
          ? data.filter(Boolean)
          : Object.entries(data).map(([id, value]) => ({
              id,
              ...(value as Omit<Psychologist, "id">),
            }));

        setPsychologists(items);
        setStatus("Loaded");
      } catch (error) {
        setStatus("Failed to load psychologists");
        console.error(error);
      }
    }

    loadPsychologists();
  }, []);

  if (status === "Loading...") {
    return <main>Loading...</main>;
  }

  if (status === "Failed to load psychologists") {
    return <main>Failed to load psychologists</main>;
  }

  if (status === "No psychologists found") {
    return <main>No psychologists found</main>;
  }

  return (
    <main>
      <h1>Psychologists</h1>

      {psychologists.slice(0, 3).map((psychologist) => (
        <article key={psychologist.id}>
              <h2>{psychologist.name}</h2>
              <p>Experience: {psychologist.experience}</p>
              <p>License: {psychologist.license}</p>
              <p>Initial consultation: {psychologist.initial_consultation}</p>
          <p>Specialization: {psychologist.specialization}</p>
          <p>Rating: {psychologist.rating}</p>
          <p>Price per hour: {psychologist.price_per_hour}</p>
        </article>
      ))}
    </main>
  );
}
