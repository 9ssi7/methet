import { req, withQuery } from "./base.api";

type PraiseListDto = {
  to_user_name: string;
  to_user_avatar_url: string;
  message: string;
  created_at: string;
};

export const praiseList = async (query: string) => {
  return req<PraiseListDto[]>(withQuery("praises", query), {
    method: "GET",
  });
};

export const praiseListByUser = async (to_user_name: string, query: string) => {
  return req<PraiseListDto[]>(
    withQuery(`praises/by-user`, query + `&to_user_name=${to_user_name}`),
    {
      method: "GET",
    }
  );
};

export const praiseCreate = async (
  to_user_name: string,
  message: string,
  token: string
) => {
  return req(`praises`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({ message, to_user_name }),
  });
};
