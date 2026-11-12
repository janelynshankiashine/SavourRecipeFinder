// FR-07: Light and dark theme with saved preference.
(function () {
  const savedTheme = localStorage.getItem("savourTheme") || "light";
  document.body.classList.toggle("dark", savedTheme === "dark");

  document.addEventListener("click", function (event) {
    if (event.target.closest("[data-theme-toggle]")) {
      document.body.classList.toggle("dark");
      localStorage.setItem("savourTheme", document.body.classList.contains("dark") ? "dark" : "light");
    }
  });
})();