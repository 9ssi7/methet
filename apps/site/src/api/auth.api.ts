import { req } from "./base.api";

type StartAuthRes = {
  redirect_uri: string;
};

type FinishAuthRes = {
  token: string;
};

export type UserDetailRes = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export const startLogin = async () => {
  return req<StartAuthRes>("auth/login", { method: "GET" });
};

export const finishLogin = async (code: string) => {
  return req<FinishAuthRes>("auth/login", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
};

export const getCurrentUser = async (token: string) => {
  return req<UserDetailRes>("auth/user", {
    headers: {
      Authorization: token,
    },
  });
};
