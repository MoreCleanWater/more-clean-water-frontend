export function getCategory() {
  return fetch("http://localhost:3333/category").then((data) => data.json());
}
