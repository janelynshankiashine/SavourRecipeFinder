// FR-08: Small calculator with safe input checks and divide-by-zero handling.
document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("calcDisplay");
  if (!display) return;
  let expression = "";
  document.querySelectorAll("[data-calc]").forEach(button => button.addEventListener("click", function () {
    const key = this.dataset.calc;
    const message = document.getElementById("calcMessage");
    message.textContent = "";
    if (key === "C") { expression = ""; display.value = "0"; return; }
    if (key === "=") {
      if (!expression || !/^[0-9+\-*/.() ]+$/.test(expression)) { message.textContent = "Enter a valid calculation."; return; }
      try {
        const result = Function('"use strict"; return (' + expression + ')')();
        if (!Number.isFinite(result)) throw new Error("Invalid result");
        expression = String(Number(result.toFixed(8)));
        display.value = expression;
      } catch (error) { message.textContent = "Invalid calculation. Check the expression."; expression = ""; display.value = "Error"; }
      return;
    }
    expression += key;
    display.value = expression;
  }));
});