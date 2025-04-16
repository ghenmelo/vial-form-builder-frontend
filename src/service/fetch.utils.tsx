export async function handleResponse<T>(
  response: Response,
  fallbackErrorMessage: string = "Something went wrong"
): Promise<T> {
  const json = await response.json();

  if (!response.ok) {
    const errorMessage = json.message || fallbackErrorMessage;
    throw new Error(errorMessage);
  }

  return json.data;
}
