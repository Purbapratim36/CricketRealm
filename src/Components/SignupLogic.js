// src/Components/SignupLogic.js
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

// Mock login/signup - replace with real DB logic later
export const handleSignup = async (name, email, password) => {
  const user = { name, email };
  return { success: true, user };
};

export const handleLogin = async (email, password) => {
  const user = { email };
  return { success: true, user };
};

export const handleLogout = async () => {
  await signOut(auth);
  return true;
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = {
      name: result.user.displayName,
      email: result.user.email
    };
    return { success: true, user };
  } catch (error) {
    console.error("Google sign-in failed", error);
    return { success: false, error };
  }
};
export const getFlagImage = (countryCode) => {
  return <img src={`/flags/${countryCode.toLowerCase()}.png`} alt={`${countryCode} flag`} className="flag-icon" />;
};