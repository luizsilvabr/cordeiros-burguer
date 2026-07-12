const API_URL = import.meta.env.VITE_API_URL;

export interface HttpErrorIssue {
  path: string;
  message: string;
}

export class HttpError extends Error {
  status: number;
  issues?: HttpErrorIssue[];

  constructor(message: string, status: number, issues?: HttpErrorIssue[]) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.issues = issues;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (res.status === 204) {
    return undefined as T;
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new HttpError(
      data?.error ?? "Erro inesperado ao falar com o servidor",
      res.status,
      data?.issues,
    );
  }

  return data as T;
}

export const http = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),

  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  put: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};