const LOCAL_STORAGE_ACCESS_TOKEN_KEY = "access_token";

export function getAccessToken(): string {
  return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY) || "";
}

export function setAccessToken(token: string): void {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, token);
}

export function removeAccessToken(): void {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
}
