export type TServerErrorResponse = {
  detail?: string | string[] | Record<string, unknown>;
};

export function isServerErrorResponse(
  response: unknown,
): response is TServerErrorResponse {
  return (response as TServerErrorResponse)?.detail !== undefined;
}
