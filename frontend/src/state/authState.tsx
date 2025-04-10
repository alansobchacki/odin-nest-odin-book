import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const authStateAtom = atomWithStorage("authState", {
  id: "",
  credentials: "",
  isAuthenticated: false,
});

export const hydratedAuthStateAtom = atom((get) => get(authStateAtom));
