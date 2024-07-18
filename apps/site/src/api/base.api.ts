const ApiUrl = import.meta.env.PUBLIC_BASE_API_URL || "https://api.methet.app";

export type ReqResult<T> = Promise<[T | null, number]>;

export async function req<T = any>(
  endpoint: string,
  options: RequestInit = {}
): ReqResult<T> {
  const extraHeads: Record<string, string> = {};
  if (!(options.body instanceof FormData)) {
    extraHeads["Content-Type"] = "application/json";
  }
  const response = await fetch(`${ApiUrl}/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      ...extraHeads,
    },
    mode: "cors",
  }).catch(() => new Response(null, { status: 500 }));
  if (!response.ok) {
    try {
      const json = await response.json();
      return [json, response.status];
    } catch (e: any) {}
    return [null, response.status];
  }
  return [await response.json(), response.status];
}

export const withQuery = (endpoint: string, query?: string): string => {
  return query ? `${endpoint}?${query}` : endpoint;
};
