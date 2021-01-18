export async function getCategories() {
  const response = await fetch("http://localhost:3333/category");
  if (response.status >= 200 && response.status <= 299) {
    return await response.json();
  } else {
    console.log(response.status, response.statusText);
  }
}

export async function saveCategory(category, description) {
  const data = await fetch("http://localhost:3333/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: category,
      description: description,
    }),
  });
  return await data.json();
}
