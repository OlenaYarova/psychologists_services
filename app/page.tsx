// import styles from "./page.module.css";
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "../components/Modal/Modal";
import AuthForm from "../components/AuthForm/AuthForm";
import { observeAuthState, logOut } from "../lib/auth";

export default function Home() {
  const [authMessage, setAuthMessage] = useState("Checking user...");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      if (user) {
        setAuthMessage(`Logged in as: ${user.email}`);
      } else {
        setAuthMessage("No authorized user");
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleLogOut() {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  }

function openAuthModal() {
    setIsAuthModalOpen(true);
  }

  function closeAuthModal() {
    setIsAuthModalOpen(false);
  }

  return (
    <main>
      <h1>Psychologists Services</h1>
      <p>Find the right psychologist for your needs</p>
      <Link href="/psychologists">Get started</Link>

      <p>{authMessage}</p>

      <button type="button" onClick={openAuthModal}>
        Open Auth Modal
      </button>

    <button type="button" onClick={handleLogOut}>
        Log out
      </button>

      <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal}>
        <AuthForm />
      </Modal>

    </main>
  );
}
