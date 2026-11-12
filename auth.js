document.addEventListener("DOMContentLoaded", function () {
  const signup = document.getElementById("signupForm");
  if (signup) signup.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;
    const terms = document.getElementById("terms").checked;
    const message = document.getElementById("signupMessage");
    if (!terms) { message.textContent = "Please agree to the Terms of Service."; return; }
    if (password.length < 8) { message.textContent = "Password must contain at least 8 characters."; return; }
    localStorage.setItem("savourAccount", JSON.stringify({ email, password }));
    message.textContent = "Account created successfully. You can now sign in.";
    signup.reset();
  });

  const toggle = document.getElementById("togglePassword");
  if (toggle) toggle.addEventListener("click", function () {
    const input = document.getElementById("signinPassword");
    input.type = input.type === "password" ? "text" : "password";
    toggle.textContent = input.type === "password" ? "Show" : "Hide";
  });

  const signin = document.getElementById("signinForm");
  if (signin) signin.addEventListener("submit", function (event) {
    event.preventDefault();
    const message = document.getElementById("signinMessage");
    const email = document.getElementById("signinEmail").value.trim().toLowerCase();
    const password = document.getElementById("signinPassword").value;
    let account = null;
    try { account = JSON.parse(localStorage.getItem("savourAccount")); } catch (error) {}
    if (!account || account.email !== email || account.password !== password) {
      message.textContent = "Invalid email or password. Please check your details or sign up first.";
      message.style.color = "#c44";
      return;
    }
    sessionStorage.setItem("savourSignedIn", "true");
    window.location.href = "home.html";
  });
});