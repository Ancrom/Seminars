const BASE_URL = "http://localhost:3000/seminars";

async function getSeminars(url = BASE_URL) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function removeSeminar(id) {
  const url = `${BASE_URL}/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

async function updateSeminar(id, data) {
  const url = `${BASE_URL}/${id}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export { getSeminars, removeSeminar, updateSeminar, BASE_URL };
