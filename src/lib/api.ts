const DEFAULT_TIMEOUT = 15_000;

type RequestOptions = RequestInit & {
  timeout?: number;
};

class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new ApiError(
        `Request failed: ${response.status} ${response.statusText}`,
        response.status,
        data
      );
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(id);
  }
}

export const api = {
  get: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { ...options, method: 'GET' }),

  post: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>(url, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }),

  put: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>(url, { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined }),

  patch: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>(url, { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),

  delete: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { ...options, method: 'DELETE' }),
};

export { ApiError };
