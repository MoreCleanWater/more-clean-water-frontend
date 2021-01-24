export async function getCategories() {
  const response = await fetch("http://localhost:3333/category");
  return response.status >= 200 && response.status <= 299
    ? await response.json()
    : console.log(response.status, response.statusText);
}

export async function saveCategory(category, description) {
  const response = await fetch("http://localhost:3333/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: category,
      description: description,
    }),
  });
  return response.status >= 200 && response.status <= 299
    ? await response.json()
    : console.log(response.status, response.statusText);
}

export async function deleteCategory(id) {
  const response = await fetch("http://localhost:3333/category/" + id, {
    method: "DELETE",
  });
  return response.status >= 200 && response.status <= 299
    ? await response.json()
    : console.log(response.status, response.statusText);
}

export async function saveContent(formData) {
  const response = await fetch("http://localhost:3333/content", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  return response.status >= 200 && response.status <= 299
    ? await response.json()
    : console.log(response.status, response.statusText);
}
