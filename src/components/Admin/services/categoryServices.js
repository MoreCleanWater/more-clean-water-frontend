export function getCategory() {
  return fetch("http://localhost:3333/category").then((data) => data.json());
}

export function setCategory(category, description) {
  return fetch("http://localhost:3333/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: category,
      description: description,
    }),
  }).then((data) => data.json());
}
