// FR-06: Floating chatbot with keyword-based replies and auto-scrolling messages.
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".chat-fab")) return;
  const fab = document.createElement("button");
  fab.className = "chat-fab"; fab.type = "button"; fab.textContent = "✦"; fab.setAttribute("aria-label", "Open SAVOUR assistant");
  const panel = document.createElement("section"); panel.className = "chat-panel"; panel.setAttribute("aria-label", "SAVOUR chatbot");
  panel.innerHTML = `<div class="chat-head"><strong>SAVOUR Assistant</strong><button type="button" aria-label="Close chat">×</button></div><div class="chat-log" aria-live="polite"><div class="bot-msg">Hello! I can help with recipes, ingredients, cooking time and favourites. What would you like to know?</div></div><form class="chat-form"><input type="text" placeholder="Ask a cooking question..." aria-label="Message" required><button type="submit">Send</button></form>`;
  document.body.append(fab, panel);
  const log = panel.querySelector(".chat-log");
  function addMessage(text, className) { const item = document.createElement("div"); item.className = className; item.textContent = text; log.appendChild(item); log.scrollTop = log.scrollHeight; }
  function reply(message) {
    const text = message.toLowerCase();
    if (text.includes("hello") || text.includes("hi")) return "Hello! Welcome to SAVOUR. What are you planning to cook?";
    if (text.includes("breakfast")) return "Try Chocolate Pancakes or Avocado Toast from our Breakfast category.";
    if (text.includes("lunch")) return "Fresh Garden Salad and Vegetable Fried Rice are good lunch ideas.";
    if (text.includes("dinner")) return "You can explore Creamy Garlic Pasta and Margherita Pizza for dinner.";
    if (text.includes("dessert") || text.includes("sweet")) return "Try Strawberry Cheesecake or Chocolate Lava Cake.";
    if (text.includes("time") || text.includes("quick")) return "Use the preparation time shown on each recipe card to find a quick meal.";
    if (text.includes("ingredient")) return "Select View Recipe on a recipe card to see its full ingredient list.";
    if (text.includes("favourite") || text.includes("favorite") || text.includes("save")) return "Tap the heart on a recipe card to add or remove it from My Favourite Recipes.";
    if (text.includes("thank")) return "You're welcome! Happy cooking.";
    return "I can help you find breakfast, lunch, dinner or dessert ideas. You can also ask about ingredients, cooking time or saving favourites.";
  }
  fab.addEventListener("click", () => panel.classList.toggle("open"));
  panel.querySelector(".chat-head button").addEventListener("click", () => panel.classList.remove("open"));
  panel.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const input = this.querySelector("input"); const message = input.value.trim();
    if (!message) return;
    addMessage(message, "user-msg"); input.value = "";
    addMessage(reply(message), "bot-msg");
  });
});