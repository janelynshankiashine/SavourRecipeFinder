// SAVOUR recipe finder: search, categories, favourites and recipe detail modal.
document.addEventListener("DOMContentLoaded", async function () {
  const recipeContainer = document.getElementById("recipeContainer");
  const favoriteContainer = document.getElementById("favoriteContainer");
  const searchInput = document.getElementById("searchInput");
  const noResults = document.getElementById("noResults");
  const emptyFavorites = document.getElementById("emptyFavorites");
  const modal = document.getElementById("recipeModal");
  let recipes = [];
  let category = "All";
  let favourites = JSON.parse(localStorage.getItem("savourFavorites") || "[]");

  try {
    const response = await fetch("recipes.json");
    if (!response.ok) throw new Error("Could not load recipe data.");
    recipes = await response.json();
  } catch (error) {
    recipeContainer.innerHTML = "<p>Recipes could not load. Please open this project using VS Code Live Server.</p>";
    return;
  }
  document.getElementById("recipeCount").textContent = recipes.length;

  function card(recipe) {
    const saved = favourites.includes(recipe.id);
    return `<article class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
      <div class="card-content"><p class="card-category">${recipe.category}</p><h3>${recipe.name}</h3>
      <p class="card-time">Preparation time: ${recipe.time}</p>
      <div class="card-actions"><button class="view-btn" data-view="${recipe.id}">View recipe</button>
      <button class="favorite-btn" data-favorite="${recipe.id}" aria-label="Toggle favourite">${saved ? "♥" : "♡"}</button></div></div></article>`;
  }
  function show(list) {
    recipeContainer.innerHTML = list.map(card).join("");
    noResults.hidden = list.length !== 0;
  }
  function showFavourites() {
    const list = recipes.filter(item => favourites.includes(item.id));
    favoriteContainer.innerHTML = list.map(card).join("");
    emptyFavorites.hidden = list.length !== 0;
    document.getElementById("savedCount").textContent = list.length;
  }
  function filter() {
    const term = searchInput.value.trim().toLowerCase();
    show(recipes.filter(item => (category === "All" || item.category === category) &&
      (item.name.toLowerCase().includes(term) || item.ingredients.join(" ").toLowerCase().includes(term))));
  }
  function openRecipe(id) {
    const recipe = recipes.find(item => item.id === id);
    if (!recipe) return;
    document.getElementById("modalImage").src = recipe.image;
    document.getElementById("modalImage").alt = recipe.name;
    document.getElementById("modalCategory").textContent = recipe.category;
    document.getElementById("modalTitle").textContent = recipe.name;
    document.getElementById("modalTime").textContent = "Preparation time: " + recipe.time;
    document.getElementById("modalIngredients").innerHTML = recipe.ingredients.map(x => `<li>${x}</li>`).join("");
    document.getElementById("modalInstructions").innerHTML = recipe.instructions.map(x => `<li>${x}</li>`).join("");
    modal.classList.add("show");
  }
  searchInput.addEventListener("input", filter);
  document.getElementById("searchButton").addEventListener("click", filter);
  document.querySelectorAll(".category-btn").forEach(button => button.addEventListener("click", function () {
    category = this.dataset.category;
    document.querySelectorAll(".category-btn").forEach(item => item.classList.remove("active"));
    this.classList.add("active");
    filter();
  }));
  document.addEventListener("click", function (event) {
    const view = event.target.closest("[data-view]");
    const fav = event.target.closest("[data-favorite]");
    if (view) openRecipe(Number(view.dataset.view));
    if (fav) {
      const id = Number(fav.dataset.favorite);
      favourites = favourites.includes(id) ? favourites.filter(x => x !== id) : [...favourites, id];
      localStorage.setItem("savourFavorites", JSON.stringify(favourites));
      filter(); showFavourites();
    }
  });
  function close() { modal.classList.remove("show"); }
  document.getElementById("closeModal").addEventListener("click", close);
  modal.addEventListener("click", event => { if (event.target === modal) close(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") close(); });
  show(recipes); showFavourites();
});