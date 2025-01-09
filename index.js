async function main() {
  const response = await fetch("https://www.omdbapi.com/?apikey=490768e9&s=Fast");
  const data = await response.json();
  console.log(data);
}
