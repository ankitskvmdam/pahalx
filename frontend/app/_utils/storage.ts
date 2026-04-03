const LOCAL_STORAGE_ACCESS_TOKEN_KEY = "access_token";

export function getAccessToken(): string {
  if (typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY) || "";
}

export function setAccessToken(token: string): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, token);
}

export function removeAccessToken(): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
}
