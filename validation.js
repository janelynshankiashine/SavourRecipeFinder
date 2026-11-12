// FR-02: Regex validation on blur and submit.
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  if (!form) return;
  const fields = {
    fullName: { test: value => /^[a-zA-Z\s]{2,50}$/.test(value.trim()), message: "Use 2–50 letters and spaces only." },
    empId: { test: value => /^[A-Z0-9]{6,12}$/i.test(value.trim()), message: "Enter 6–12 letters or numbers." },
    regEmail: { test: value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim()), message: "Enter a valid email address." },
    mobile: { test: value => /^[6-9]\d{9}$/.test(value.trim()), message: "Enter a 10-digit number starting with 6–9." },
    dept: { test: value => value !== "", message: "Please select your division." },
    regPassword: { test: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value), message: "Use 8+ characters with uppercase, lowercase, number and symbol (@$!%*?&)." },
    confirmPassword: { test: value => value !== "" && value === document.getElementById("regPassword").value, message: "Passwords do not match." }
  };
  const submit = document.getElementById("registerSubmit");

  function validate(id) {
    const input = document.getElementById(id);
    const rule = fields[id];
    const valid = rule.test(input.value);
    input.classList.toggle("invalid", !valid);
    input.setAttribute("aria-invalid", String(!valid));
    input.nextElementSibling.textContent = valid ? "" : rule.message;
    return valid;
  }
  function validateAll() {
    return Object.keys(fields).map(validate).every(Boolean);
  }
  Object.keys(fields).forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener("blur", () => { validate(id); submit.disabled = !validateAll(); });
    input.addEventListener("input", () => { validate(id); submit.disabled = !validateAll(); });
  });
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validateAll()) { submit.disabled = true; return; }
    const account = { name: document.getElementById("fullName").value.trim(), email: document.getElementById("regEmail").value.trim().toLowerCase(), password: document.getElementById("regPassword").value };
    localStorage.setItem("savourAccount", JSON.stringify(account));
    alert("Registration successful! You can now sign in.");
    window.location.href = "signin.html";
  });
});