import { atom } from "nanostores";
import type { UserDetailRes } from "../api/auth.api";

export const isAuthenticated = atom<boolean>(false);
export const token = atom<string | null>(localStorage.getItem("token"));
export const user = atom<UserDetailRes | null>(null);
