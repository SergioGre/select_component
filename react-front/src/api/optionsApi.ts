const API_BASE_URL = "http://localhost:8080";

export async function fetchOptions(): Promise<Response> {
  return fetch(`${API_BASE_URL}/option/for/select`);
}

export async function setOption(value: string): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/selected/option`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  });

  if (!response.ok) {
    throw new Error("Failed to post selection");
  }

  return response.json();
}
