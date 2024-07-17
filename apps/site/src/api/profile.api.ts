import { req } from "./base.api";

type TopHonorableUserDto = {
  user_name: string;
  avatar_url: string;
  praise_count: number;
};

export const getTopHonorableUsers = async () => {
  return req<TopHonorableUserDto[]>("top-honorables", { method: "GET" });
};
