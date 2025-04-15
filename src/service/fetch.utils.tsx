export async function handleResponse<T>(
  response: Response,
  errorMessage: string
): Promise<T> {
  if (!response.ok) {
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json.data;
}
