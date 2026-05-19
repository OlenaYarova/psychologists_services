"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "../../lib/firebase";
import { Psychologist } from "../../types/psychologist";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import { observeAuthState } from "../../lib/auth";


export default function PsychologistsPage() {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isFavoriteActionDisabled = !isAuthenticated;
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  function handleToggleFavorite(psychologist: Psychologist) {
    setFavoriteIds((currentFavorites) => {
      if (currentFavorites.includes(psychologist.id)) {
        return currentFavorites.filter((id) => id !== psychologist.id);
      }

      return [...currentFavorites, psychologist.id];
    });
  }

  useEffect(() => {
    async function loadPsychologists() {
      try {
        const snapshot = await get(ref(database, "psychologists"));

        if (!snapshot.exists()) {
          setStatus("No psychologists found");
          setIsLoading(false);
          return;
        }

        const data = snapshot.val();

        const items: Psychologist[] = Array.isArray(data)
          ? data.filter(Boolean).map((item, index) => ({
            id: String(index),
            ...(item as Omit<Psychologist, "id">),
          }))
          : Object.entries(data).map(([id, value]) => ({
            id,
            ...(value as Omit<Psychologist, "id">),
          }));

        setPsychologists(items);
        setIsLoading(false);
      } catch (error) {
        setStatus("Failed to load psychologists");
        setIsLoading(false);
        console.error(error);
      }
    }

    const unsubscribe = observeAuthState((user) => {
      setIsAuthenticated(Boolean(user));
    });

    loadPsychologists();

    return () => unsubscribe();
  }, []);

  if (status === "Failed to load psychologists") {
    return <main>Failed to load psychologists</main>;
  }

  if (status === "No psychologists found") {
    return <main>No psychologists found</main>;
  }

  if (isLoading) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <Link href="/">Back to home</Link>
      <h1>Psychologists</h1>
      <p>Found psychologists: {psychologists.length}</p>
      <p>Favorites selected: {favoriteIds.length}</p>


      {psychologists.map((psychologist) => (
        <PsychologistCard
          key={psychologist.id}
          psychologist={psychologist}
          isFavoriteActionDisabled={isFavoriteActionDisabled}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favoriteIds.includes(psychologist.id)}
        />
      ))}
    </main>
  );
}
