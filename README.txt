SAVOUR - IA-3 Web Technology Project
====================================

HOW TO RUN
1. Extract SAVOUR_IA3_Project.zip.
2. Open the extracted folder in Visual Studio Code.
3. Install the VS Code extension named "Live Server" if you do not have it.
4. Right-click index.html and choose "Open with Live Server".
5. Use the navigation links to open Register, Sign Up, Sign In and the Recipe Dashboard.

FILES
index.html       Landing page (FR-01)
register.html    Detailed registration and Regex validation (FR-02)
signup.html      Simple account creation and Terms checkbox (FR-03)
signin.html      Sign-in form and show/hide password (FR-04)
home.html        Responsive recipe dashboard, recipe finder and calculator UI (FR-05, FR-08)
css/styles.css   Shared responsive styling and theme variables
js/theme.js      Light/dark mode saved in localStorage (FR-07)
js/validation.js Registration field validation (FR-02)
js/auth.js       Demo sign-up and sign-in behaviour (FR-03, FR-04)
js/app.js        Recipe search, filters, favourites and recipe details
js/calculator.js Calculator logic (FR-08)
js/chatbot.js    Floating keyword-based chatbot (FR-06)
recipes.json     Recipe data

IMPORTANT NOTES
- Sign-up/sign-in/registration are front-end demonstrations. Passwords are stored in browser localStorage for this academic prototype. This is NOT secure authentication and must not be used for real accounts.
- The calculator evaluates basic arithmetic and blocks non-mathematical characters. It handles invalid expressions and division by zero.
- Recipe photographs are loaded from external image URLs, so an internet connection is needed for those images.
- Use Live Server, not by opening the HTML file directly, because the recipe data is loaded using fetch().
- The DOCX checklist also requires GitHub, Vercel deployment, a 20+ page report, screenshots, QR codes and a 5-minute presentation video. These are submission tasks, not website code features.
